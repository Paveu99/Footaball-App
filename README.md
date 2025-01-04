# FootballApp ⚽🏆

**FootballApp** is an exciting and intuitive web application designed to manage football teams, players, and match statistics. Whether you're a football fan, a team manager, or just someone looking to track the latest sports results, this app is packed with features to help you stay on top of the game!

## Key Features ✨

1. **Player Management**  
   - View, add, edit, and delete players.
   - Prevent deletion of players currently in a team.
   - Easily manage player details, such as name and team affiliation.

2. **Team Management**  
   - List all teams, and add, edit, or delete teams.
   - Assign players to teams with an easy-to-use interface.
   - Teams cannot be deleted if they have participated in matches.

3. **Match Management**  
   - View all matches played, and add new games with details like date, teams involved, score, and venue.
   - Edit match details when necessary.

4. **Statistics Dashboard**  
   - View the most recent match details, including teams, score, and match duration.
   - Visualize match frequency over different time periods (day, week, month).
   - Track top-performing teams based on goals scored.

5. **Dark & Light Themes**  
   - Switch between dark and light themes to suit your preferences and mood.
   
6. **Responsive Forms & Validation**  
   - All data input forms are carefully validated to ensure data accuracy and integrity.

7. **Enhanced Data Management**  
   - Integrated with `react-query` for optimized data fetching and management.
   - Styled with `styled-components` for a seamless and modern user experience.

8. **Strict Mode Support**  
   - The app is fully compatible with React Strict Mode for improved performance and debugging.

9. **Code Quality**  
   - Linter and Husky set up to ensure code consistency and automatic formatting.

## Why Choose FootballApp? 🤔

- **User-Friendly Interface**: Navigate with ease thanks to a sleek and responsive design.
- **Comprehensive Features**: From player and team management to detailed match statistics, FootballApp covers all your needs.
- **Optimized for Performance**: Built with modern tools like React, `react-query`, and `styled-components` for a smooth, fast experience.
- **Easy Setup**: The app is simple to run and can be easily customized and extended as needed.

# Table of Content
- Demo
- Technologies

# Demo
Here is a demonstration of how the app works:
- Desktop: https://youtu.be/dh_BLcR3O1c

To run the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Paveu/FootballApp.git
    cd football-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run dev
    ```

4. Start json-server:
    ```bash
    npx json-server ./src/utils/football-data.json
    ```

# Tech Stack
- "date-fns": "^3.6.0",
- "json-server": "^1.0.0-beta.1",
- "lodash": "^4.17.21",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "recharts": "^2.12.7",
- "styled-components": "^6.1.12",
- "husky": "^8.0.0",
- "lint-staged": "^15.2.7",
- "prettier": "^3.3.3",
- "sass": "^1.77.8",
- "typescript": "^5.2.2",
- "vite": "^5.3.1".
