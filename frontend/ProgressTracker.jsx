// // src/components/ProgressTracker.jsx

// import React from 'react';
// import styled from 'styled-components';
// import { useProgress } from '../context/ProgressContext';
// import { FaLock, FaLockOpen } from 'react-icons/fa';

// const TrackerPage = styled.div`
//   font-family: 'Poppins', sans-serif;
//   background: #f4f8fb;
//   min-height: 100vh;
//   padding: 40px 20px;
// `;

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   background: white;
//   padding: 30px;
//   border-radius: 15px;
//   box-shadow: 0 8px 25px rgba(0,0,0,0.1);
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #3a68c2;
//   margin-bottom: 30px;
// `;

// const TaskList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const TaskItem = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
//   margin-bottom: 15px;
//   border-radius: 10px;
//   background: ${props => (props.completed ? '#e9f7ef' : '#f8f9fa')};
//   border: 1px solid ${props => (props.completed ? '#d4edda' : '#dee2e6')};
//   color: ${props => (props.completed ? '#155724' : '#6c757d')};
//   transition: all 0.3s ease;
// `;

// const TaskName = styled.span`
//   font-weight: 600;
//   font-size: 1.1rem;
// `;

// const StatusIcon = styled.div`
//   font-size: 1.5rem;
//   color: ${props => (props.completed ? '#28a745' : '#dc3545')};
// `;

// const ProgressTracker = () => {
//   // Get the list of completed tasks from our context
//   const { completedTasks } = useProgress();

//   // Define all possible tasks in your app
//   const allTasks = [
//     'Breathing Exercise',
//     'Stress Journaling',
//     'Mindful Journal',
//     'Learn & Explore',
//     'Gratitude Practice',
//     'Sensory Awareness'
//   ];

//   return (
//     <TrackerPage>
//       <Container>
//         <Title>Your Progress</Title>
//         <TaskList>
//           {allTasks.map(taskName => {
//             // Check if the current task is in the completedTasks array
//             const isCompleted = completedTasks.includes(taskName);

//             return (
//               <TaskItem key={taskName} completed={isCompleted}>
//                 <TaskName>{taskName}</TaskName>
//                 <StatusIcon completed={isCompleted}>
//                   {isCompleted ? <FaLockOpen /> : <FaLock />}
//                 </StatusIcon>
//               </TaskItem>
//             );
//           })}
//         </TaskList>
//       </Container>
//     </TrackerPage>
//   );
// };

// export default ProgressTracker;



