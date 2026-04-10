# Requirements Traceability Matrix 
**Project:** Flappy Bucs  
**Sprint:** Sprint 1 (Apr 6 – Apr 13)

| Req ID | Requirement Description                          | Jira ID  | Type     | Priority | Owner | Test Verification | Done? |
|--------|--------------------------------------------------|----------|----------|----------|-------|-------------------|------|
| R1     | Research and select technology stack             | DEV-32   | Spike    | High     |    LB   | Document chosen stack and verify team agreement |      |
| R2     | Design core game architecture (UML, ERD, system structure) | DEV-34   | Feature  | High     |    LB   | UML class diagram and architecture design created and reviewed by team |      |
| R3     | Implement player character ("Buc")               | DEV-29   | Feature  | High     | LE    | Player renders on screen and responds to input |      |
| R4     | Implement gravity mechanics                     | DEV-9    | Feature  | High     | LE    | Player falls over time without input and accelerates downward |      |
| R5     | Implement player boundary constraints            | DEV-11   | Feature  | Medium   | DR    | Player cannot move beyond screen bounds (top/bottom) |      |
| R6     | Design overall game loop                        | DEV-33   | Design   | High     | N     | Game loop design documented and matches UML/flow diagram |      |
| R7     | Create main game page/UI                        | DEV-35   | Feature  | Medium   | M     | Game page loads in browser and displays game elements correctly |      |

---

## Traceability Summary

- **Architecture Coverage:** R1, R2, R6  
- **Core Gameplay Mechanics:** R3, R4, R5  
- **User Interface:** R7  

---

## Sprint Goal Alignment

> *"Have a plan for architecture and get something working (prioritize a working product)."*

- Architecture defined (R1, R2)  
- Core gameplay started (R3, R4, R5)  
- Playable foundation forming (R6, R7)  

---

## Notes

- All requirements map directly to Jira work items.
- This sprint focuses on foundational components, not final polish.
- Gravity and game loop are critical foundation for the next sprints.