# Interview Scheduler

A modern React application for managing and scheduling interviews with features like calendar view, timezone support, and interview management.

## Links
- **Live Demo**: [Interview Scheduler](https://clinquant-donut-876ecc.netlify.app/)
- **GitHub**: [Interview-Scheduler](https://github.com/NikhilBhagoria/Interview-Scheduler.git)

## Features

- Interactive calendar view with month, week, day, and agenda views
- Interview scheduling with timezone support
- Dashboard for interview management
- Responsive design for all device sizes
- Real-time validation for scheduling conflicts
- Local storage persistence

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NikhilBhagoria/Interview-Scheduler.git
cd interview-scheduler
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

## Design Decisions

### Architecture
- **Component-Based Structure**: Organized components by feature (Calendar, Dashboard, InterviewForm)
- **State Management**: Used Redux Toolkit for centralized state management
- **Styling**: Implemented styled-components for component-scoped styling and theme consistency
- **Routing**: React Router for navigation between different views
- **Data Persistence**: Local storage for maintaining interview data across sessions

### Technical Stack
- React 19
- Redux Toolkit
- React Router
- Styled Components
- React Big Calendar
- React Toastify
- Date-fns-tz

### UI/UX Considerations
- Responsive design with mobile-first approach
- Intuitive navigation with hamburger menu for mobile
- Consistent color scheme and styling
- Interactive feedback with toast notifications
- Confirmation dialogs for destructive actions

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   ├── Dashboard/
│   ├── InterviewForm/
│   ├── Navbar/
│   └── common/
├── store/
│   ├── store.js
│   └── interviewSlice.js
├── utils/
│   └── helpers.js
├── styles/
│   └── GlobalStyles.js
└── App.jsx
```

## Assumptions

1. **User Requirements**
   - Users need to manage interviews across different timezones
   - Interview scheduling requires conflict prevention
   - Basic CRUD operations for interview management
   - Calendar view for better schedule visualization

2. **Technical Requirements**
   - Modern browser support
   - Local data persistence is sufficient
   - Single user system (no authentication required)
   - Client-side validation is adequate

## Challenges and Solutions

### 1. Timezone Management
**Challenge**: Handling interviews across different timezones
**Solution**: 
- Implemented date-fns-tz for timezone conversions
- Stored dates in UTC format
- Display times in user's local timezone

### 2. Interview Conflict Prevention
**Challenge**: Preventing double-booking of interviewers
**Solution**: 
- Implemented validation checks before scheduling
- Real-time conflict detection
- User feedback through toast notifications

### 3. Responsive Design
**Challenge**: Creating a consistent experience across devices
**Solution**: 
- Mobile-first approach with styled-components
- Adaptive calendar view
- Collapsible navigation for mobile devices

## Future Improvements

1. **Feature Enhancements**
   - User authentication and authorization
   - Email notifications for interviews
   - Recurring interview scheduling
   - Integration with external calendar services

2. **Technical Improvements**
   - Backend integration for data persistence
   - Unit and integration testing
   - Performance optimization for large datasets
   - PWA support for offline access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- React team for the excellent framework
- Vite team for the build tooling
- All contributors and users of the application

