// import React from 'react';
// import ReactNotification from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css';
// import { store } from 'react-notifications-component';
// import { useTheme } from '@material-ui/styles';
// import Notification from '../components/Notification/Notification';


// // TODO: develop this component further
// // 1. parametrise all configuration options
// // 2. create different types like success, error, warning etc.
// // 3. create styles for all notification types
// // 4. add icons for all notification types

// const useNotifications = () => {

//     const theme = useTheme()

//     const showNotification = ({ title, message, type, container }: any) => {

//         store.addNotification({
//             content: <Notification
//                 title={title}
//                 message={message}
//                 theme={theme} />,
//             title,
//             message,
//             type: type || 'default',                         // 'default', 'success', 'info', 'warning'
//             container: container || 'top-right',                // where to position the notifications
//             animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
//             animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
//             dismiss: {
//                 duration: 5000
//             }
//         })
//     }

//     return {
//         NotificationsContainer: ReactNotification,
//         showNotification
//     }
// }


// export default useNotifications;