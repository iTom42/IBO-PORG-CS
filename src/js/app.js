// Application Logic (Alpine.js)

document.addEventListener('alpine:init', () => {

    /**
     * Global App Store
     * Manages high-level state: age mode, current view, persistence.
     */
    Alpine.data('app', () => ({
        ageMode: null, // 'child' | 'adult'
        currentView: 'age-gate', // 'age-gate', 'menu', 'task-1', 'task-2'

        // Simple persistence object to track overall progress
        appStorage: {
            task1Completed: false,
            task2Completed: false
        },

        init() {
            // Always start at the age gate, regardless of any saved state.
            this.currentView = 'age-gate';
            this.ageMode = null;

            // Load saved progress so completed tasks/grade are preserved,
            // but never auto-skip the age selector.
            const savedState = localStorage.getItem('bnn_app_state');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                this.appStorage = parsed.appStorage || this.appStorage;

                // Recalculate grade if tasks are done
                if (this.appStorage.task1Completed && this.appStorage.task2Completed) {
                    this.calculateGrade();
                }
            }
        },

        saveState() {
            localStorage.setItem('bnn_app_state', JSON.stringify({
                ageMode: this.ageMode,
                appStorage: this.appStorage
            }));
        },

        setAgeMode(mode) {
            this.ageMode = mode;
            setAgeModeI18n(mode);
            this.currentView = 'menu';
            this.saveState();
        },

        setView(view) {
            this.currentView = view;
        },

        resetApp() {
            if (confirm(t('reset_confirm', this.ageMode))) {
                localStorage.removeItem('bnn_app_state');
                localStorage.removeItem('bnn_quiz_state');
                localStorage.removeItem('bnn_planner_state');
                location.reload();
            }
        },

        // Helper to mark tasks as complete (called from child stores)
        completeTask(taskId) {
            if (taskId === 1) this.appStorage.task1Completed = true;
            if (taskId === 2) this.appStorage.task2Completed = true;

            // Calculate grade if both done
            if (this.appStorage.task1Completed && this.appStorage.task2Completed) {
                this.calculateGrade();
            }

            this.saveState();
        },

        grade: null,
        quizBreakdown: { ideal: 0, ok: 0, bad: 0 },
        plannerBreakdown: { hours: 0, isOverLimit: false },

        calculateGrade() {
            // 1. Quiz Score Breakdown
            const quizState = JSON.parse(localStorage.getItem('bnn_quiz_state') || '{}');
            const answers = quizState.answers || [];

            this.quizBreakdown = {
                ideal: answers.filter(a => a && a.type === 'ideal').length,
                ok: answers.filter(a => a && a.type === 'ok').length,
                bad: answers.filter(a => a && a.type === 'bad').length
            };

            // 2. Planner Score Breakdown
            const plannerState = JSON.parse(localStorage.getItem('bnn_planner_state') || '{}');
            const grid = plannerState.grid || [];
            const screenBlocks = grid.filter(id => id === 'screen').length;
            const hours = screenBlocks * 0.5;

            this.plannerBreakdown = {
                hours: hours,
                isOverLimit: hours > 2
            };

            // Calculate Grade (0-5 points scale)
            // Quiz: Max 12 points (based on ideal answers, since we now have 12 scenarios)
            // Planner: Max 2 points if within limit
            const quizPoints = Math.min(this.quizBreakdown.ideal, 12) * (5/12);
            const plannerPoints = this.plannerBreakdown.isOverLimit ? 0 : 2;

            const totalScore = quizPoints + plannerPoints;

            if (totalScore >= 4.5) this.grade = 'A';
            else if (totalScore >= 3.5) this.grade = 'B';
            else if (totalScore >= 2.5) this.grade = 'C';
            else if (totalScore >= 1.5) this.grade = 'D';
            else this.grade = 'F';
        },

        get finalFeedback() {
            const grade = this.grade;
            if (['A', 'B', 'C', 'D'].includes(grade)) return t('final_' + grade, this.ageMode);
            return t('final_F', this.ageMode);
        }
    }));

    /**
     * Quiz Store (Task 1)
     */
    Alpine.data('quizStore', () => ({
        currentScenarioIndex: 0,
        showFeedback: false,
        showResults: false,
        currentFeedback: null,
        answers: [], // Array to store user's result for each scenario
        selectedQuestionIndex: null, // For question detail modal

        shuffledScenarios: [],
        
        init() {
            // Load state if exists
            const saved = localStorage.getItem('bnn_quiz_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.currentScenarioIndex = parsed.currentScenarioIndex || 0;
                this.answers = parsed.answers || [];
                this.shuffledScenarios = parsed.shuffledScenarios || this.shuffleScenarios();
                // If they were done, show results
                if (this.currentScenarioIndex >= SCENARIOS.length) {
                    this.showResults = true;
                }
            } else {
                // First time - shuffle scenarios
                this.shuffledScenarios = this.shuffleScenarios();
            }
        },
        
        shuffleScenarios() {
            const shuffled = [...SCENARIOS];
            // Fisher-Yates shuffle
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            // Also shuffle options within each scenario
            shuffled.forEach(scenario => {
                const options = [...scenario.options];
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
                scenario.options = options;
            });
            return shuffled;
        },

        get scenario() {
            return this.shuffledScenarios[this.currentScenarioIndex] || SCENARIOS[this.currentScenarioIndex];
        },
        
        get allScenarios() {
            return this.shuffledScenarios.length > 0 ? this.shuffledScenarios : SCENARIOS;
        },
        
        get totalScenarios() {
            return this.allScenarios.length;
        },

        getScenarioIcon(id) {
            const icons = {
                'humor': '😄',
                'flirting': '💕',
                'comparison': '📊',
                'cyberbullying': '💬',
                'notifications': '🔔',
                'wrong_content': '⚠️',
                'strange_messages': '💭',
                'shared_photo': '📷',
                'someone_elses_bullying': '🤝',
                'stranger_follow': '👤',
                'friend_insult': '💔',
                'scrolling_fatigue': '😴'
            };
            return icons[id] || '💡';
        },

        get progressPercentage() {
            const scenarios = this.allScenarios;
            if (!scenarios || scenarios.length === 0) return 0;
            return ((this.currentScenarioIndex) / scenarios.length) * 100;
        },

        saveState() {
            localStorage.setItem('bnn_quiz_state', JSON.stringify({
                currentScenarioIndex: this.currentScenarioIndex,
                answers: this.answers,
                shuffledScenarios: this.shuffledScenarios
            }));
        },

        selectAnswer(option) {
            this.currentFeedback = option;
            this.showFeedback = true;

            // Save answer if not already saved for this index
            this.answers[this.currentScenarioIndex] = option;
        },

        nextScenario() {
            this.showFeedback = false;
            this.currentScenarioIndex++;
            this.saveState();

            const scenarios = this.allScenarios;
            if (this.currentScenarioIndex >= scenarios.length) {
                this.finishQuiz();
            }
        },

        finishQuiz() {
            this.showResults = true;
            // Notify global app that task 1 is done
            this.$dispatch('task-complete', { taskId: 1 });
        },

        isPerfectScore() {
            return this.answers.every(a => a.type === 'ideal');
        },

        get idealCount() {
            return this.answers.filter(a => a && a.type === 'ideal').length;
        },

        get totalPossible() {
            return SCENARIOS.length;
        },

        restartQuiz() {
            this.currentScenarioIndex = 0;
            this.answers = [];
            this.showResults = false;
            this.showFeedback = false;
            this.saveState();
        },

        // Question detail modal methods
        openQuestionDetail(index) {
            this.selectedQuestionIndex = index;
        },

        closeQuestionDetail() {
            this.selectedQuestionIndex = null;
        },

        // Get the scenario at a specific index
        getScenarioAt(index) {
            return this.shuffledScenarios[index] || SCENARIOS[index];
        },

        // Get the user's answer at a specific index
        getUserAnswerAt(index) {
            return this.answers[index];
        },

        // Get the ideal answer for a scenario
        getIdealAnswer(scenario) {
            if (!scenario || !scenario.options) return null;
            return scenario.options.find(o => o.type === 'ideal') || null;
        },

        // Get full detail for a question at index
        getQuestionDetail(index) {
            const scenario = this.getScenarioAt(index);
            const userAnswer = this.getUserAnswerAt(index);
            const idealAnswer = this.getIdealAnswer(scenario);
            return {
                scenario,
                userAnswer,
                idealAnswer
            };
        }
    }));

    /**
     * Planner Store (Task 2)
     */
    Alpine.data('plannerStore', () => ({
        dayType: 'weekday', // 'weekday' | 'weekend'
        grid: new Array(48).fill(null), // 48 blocks of 30 min
        selectedActivityId: null,
        removeMode: false, // Mode for removing activities
        showResults: false,
        isDragging: false,

        init() {
            // Load state if exists
            const saved = localStorage.getItem('bnn_planner_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.dayType = parsed.dayType || 'weekday';
                this.grid = parsed.grid || new Array(48).fill(null);
            }
        },

        saveState() {
            localStorage.setItem('bnn_planner_state', JSON.stringify({
                dayType: this.dayType,
                grid: this.grid
            }));
        },

        get mandatoryActivities() {
            // For weekend, school is not mandatory
            if (this.dayType === 'weekend') {
                return ACTIVITIES.filter(a => a.type === 'mandatory' && a.id !== 'school');
            }
            return ACTIVITIES.filter(a => a.type === 'mandatory');
        },
        
        get optionalActivities() {
            // Add school to optional for weekend
            if (this.dayType === 'weekend') {
                const optional = ACTIVITIES.filter(a => a.type === 'optional');
                const schoolActivity = ACTIVITIES.find(a => a.id === 'school');
                if (schoolActivity) {
                    return [...optional, { ...schoolActivity, type: 'optional', name: 'Škola (volitelně)' }];
                }
                return optional;
            }
            return ACTIVITIES.filter(a => a.type === 'optional');
        },

        // Check if all mandatory activities are present in the grid
        get mandatoryComplete() {
            const mandatoryIds = this.mandatoryActivities.map(a => a.id);
            const usedIds = new Set(this.grid.filter(id => id !== null));
            return mandatoryIds.every(id => usedIds.has(id));
        },

        get isGridFull() {
            return this.grid.every(cell => cell !== null);
        },

        get totalScreenTime() {
            // Screen time is 'screen'
            const blocks = this.grid.filter(id => id === 'screen').length;
            return blocks * 0.5; // Hours
        },

        get statsByActivity() {
            // Aggregate time per activity
            const counts = {};
            this.grid.forEach(id => {
                if (id) counts[id] = (counts[id] || 0) + 0.5;
            });
            return Object.entries(counts)
                .map(([id, hours]) => {
                    const act = ACTIVITIES.find(a => a.id === id);
                    return { ...act, hours, percent: (hours / 24) * 100 };
                })
                .sort((a, b) => b.hours - a.hours);
        },

        setDayType(type) {
            if (confirm('Změna typu dne vymaže aktuální plán. Pokračovat?')) {
                this.dayType = type;
                this.grid = new Array(48).fill(null);
                this.showResults = false;
                this.saveState();
            }
        },

        selectActivity(id) {
            // Handle remove mode specially
            if (id === 'remove') {
                this.removeMode = !this.removeMode;
                this.selectedActivityId = null;
                return;
            }
            
            // Prevent selecting optional if mandatory not done
            const activity = ACTIVITIES.find(a => a.id === id);
            if (!activity) return;
            
            // Clear remove mode when selecting an activity
            this.removeMode = false;
            
            if (activity.type === 'optional' && !this.mandatoryComplete) {
                alert(t('planner_locked_alert'));
                return;
            }
            this.selectedActivityId = id;
        },

        toggleSlot(index) {
            // If in remove mode, clear the slot
            if (this.removeMode) {
                this.grid[index] = null;
                this.saveState();
                return;
            }
            
            // If no activity selected, do nothing
            if (!this.selectedActivityId) return;
            
        // If clicking same cell with same activity, remove it (toggle off)
            if (this.grid[index] === this.selectedActivityId) {
                this.grid[index] = null;
                this.saveState();
                return;
            }
            this.grid[index] = this.selectedActivityId;
            this.saveState();
        },
        startDrag(index) {
            this.isDragging = true;
            this.toggleSlot(index);
        },

        onDragOver(index) {
            if (this.isDragging) {
                this.toggleSlot(index);
            }
        },

        stopDrag() {
            this.isDragging = false;
        },

        getActivityColor(id) {
            if (!id) return 'bg-white';
            return ACTIVITIES.find(a => a.id === id)?.color || 'bg-gray-200';
        },

        getActivityIcon(id) {
            if (!id) return '';
            return ACTIVITIES.find(a => a.id === id)?.icon || '';
        },

        evaluateDay() {
            if (!this.isGridFull) return;
            this.showResults = true;
            this.$dispatch('task-complete', { taskId: 2 });
        },

        formatTime(index) {
            // Index 0 = 00:00, 1 = 00:30, etc.
            const totalMin = index * 30;
            const h = Math.floor(totalMin / 60);
            const m = totalMin % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        }
    }));

});
