# CSharp-Angular Template

A modern, production-ready template for building full-stack applications with .NET Core 8 and Angular 18. This template provides a solid foundation for developing scalable web applications with clean architecture principles and scalability.


## Features

- **📱 Responsive UI**: Built with Angular 18+ and PrimeNG components
- **🔒 Authentication & Authorization**: Includes JWT auth with refresh token mechanism
- **🏛️ Clean Architecture**: Follows SOLID principles and clean architecture patterns
- **🔌 API Integration**: Pre-configured services and interceptors for API communication
- **🌐 Internationalization**: Ready for multi-language support with ngx-translate
- **📝 Storybook Integration**: Component documentation and visual testing
- **🧪 Testing**: Setup for unit and integration tests

## Tech Stack

### Backend
- .NET 8 Web API
- Entity Framework Core
- MediatR for CQRS pattern
- Autofac for dependency injection
- JWT authentication with refresh tokens
- Logging and error handling
- File support
- Implemented security

### Frontend
- Angular 18+
- PrimeNG for UI components
- API Factory
- NgRx for state management
- Angular ESLint for code quality
- Implemented routes, guards and interceptors
- Automatic token refresh

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 18+)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/CSharp-Angular-Template.git
cd CSharp-Angular-Template
```

2. Set up the backend

```bash
cd API/Infrastructure
dotnet restore
dotnet ef database update
dotnet build
```

3. Set up the frontend

```bash
cd ../Client
npm install
```

4. Run the application

```bash
# Terminal 1 - Backend
cd API
dotnet run

# Terminal 2 - Frontend
cd Client
ng serve
```

5. Access the application at [http://localhost:4200](http://localhost:4200)

## Project Structure

```
CSharp-Angular-Template/
├── API/                          # Backend API
│   ├── Application/              # Business logic and application 
│   ├── Domain/                   # Business entities and domain logic
│   ├── Presentation/             # Controllers
│   ├── Infrastructure/           # External frameworks and tools
│   └── WebAPI/                   # API endpoints and controllers
├── Client/                       # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/             # Core functionality (auth, guards, models)
│   │   │   ├── features/         # Feature modules
│   │   │   ├── shared/           # Shared components and services
│   │   │   └── app.component.ts
│   │   └── assets/
│   └── .storybook/              # Storybook configuration
└── README.md
```

## Configuration

### Backend

Edit the `appsettings.json` file in the API project to configure:

- Database connection string
- JWT settings
- Logging options
- CORS policies

### Frontend

Edit the `environment.ts` files in the Client project to configure:

- API endpoint URLs
- Feature flags
- Third-party service keys

## Contributors

Meet our team of developers who maintain this project:

| ![Czechu7](https://avatars.githubusercontent.com/u/8471619?v=4) | ![Kkolcz](https://avatars.githubusercontent.com/u/76699027?v=4) | ![Michalrusak](https://avatars.githubusercontent.com/u/104869035?v=4) | ![Evivalarte](https://avatars.githubusercontent.com/u/152337751?v=4) |
|:---:|:---:|:---:|:---:|
| [Czechu7](https://github.com/Czechu7) | [Kkolcz](https://github.com/Kkolcz) | [Michalrusak](https://github.com/Michalrusak) | [Evivalarte](https://github.com/Evivalarte) |
| Full-Stack Developer | Full-Stack Developer | Full-Stack Developer | Full-Stack Developer |

## Addational Usage

### Storybook

Explore and test UI components in isolation:

```bash
cd Client
npm run storybook
```

### Running Tests

```bash
# Backend tests
cd API
dotnet test

# Frontend tests
cd Client
ng test
```

### Building for Production

```bash
# Backend
cd API
dotnet publish -c Release

# Frontend
cd Client
ng build --configuration production
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the CSharp-Angular-Template Team
