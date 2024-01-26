# NeuroExed Web Application

Welcome to the NeuroExed web application! This React and TypeScript-based application is designed to power the neuroscience website for our research lab, NeuroExed. Our mission is to facilitate the exchange of knowledge and discoveries in the field of neuroscience, providing valuable resources to researchers, practitioners, and enthusiasts worldwide.

## Technologies Used

The NeuroExed web application is built using the following technologies:

- React: A JavaScript library for building user interfaces.

- TypeScript: A typed superset of JavaScript that enhances code maintainability and scalability.

- Redux: A state management library for managing application state.

- Tailwind CSS: A utility-first CSS framework that enables rapid UI development with a focus on flexibility and simplicity.

- React Query: A query hook library for APIs, allowing efficient data retrieval and mutation with caching.

## Getting Started

To run the NeuroExed web application locally, follow these simple steps:

1. **Clone the repository:** Start by cloning this repository to your local machine using the following command:

    ```
    $ git clone https://github.com/devinobrien/neuroexed.git
    ```

2. **Install dependencies:** Navigate to the project directory and install the required dependencies using npm:

    ```
    $ cd neuroexed
    $ npm i
    ```

3. **Install GitHooks:** An abstraction of this has been provided for convenience:

    ```
    $ npm run prepare
    ```

4. **Run the application:** Once the dependencies are installed, start the development server with:

    ```
    $ npm start
    ```

The application will now be accessible at `http://localhost:3000`.

## Directory Structure

```
├── dist/               -    the latest build of the application
├── public/             -    public facing folder
├── src/                -    main code source
│   ├── routes          -    holds the main pages of the app
│   └── shared          -    all application shared resources
│       ├── api         -    API CRUD absraction
│       ├── assets      -    images, icons and other assets
│       ├── components  -    various abstract components
│       ├── hooks       -    images, icons and other assets
│       └── types       -    type definitions and casting
├── .depcheckrc         -    dependency audit config file
├── .eslintrc.js        -    linting config file 
├── .prettierignore     -    prettier config file
├── .prettierrc         -    prettier config file
├── redirects.toml      -    maintains routing post-deployment (netlify)
├── tailwind.config.js  -    tailwing config file
├── tsconfig.json       -    typescript config file
└── vite.config.ts      -    vite config file
```

## Helpful Tips

### Auto Formatting Code

This application uses `prettier` and `eslint` to maintain the formatting and syntax of the codebase:

### Auditing Packages

This application uses `depcheck` to audit unused packages:

```
$ npx depcheck
```

The configuration for this audit is managed through the `.depcheckrc` file in the root of the application.

### Auditing Components

This application uses `ts-prune` to locate and remove unused components within the application.

```
$ npm run prune
```

The configuration for this file is managed through `.unimportedrc.json`

## Features

The NeuroExed web application offers the following key features:

- **Lab Members:** Meet our dedicated team of researchers, scientists, and contributors who are passionate about advancing the frontiers of neuroscience.

- **Blogs:** Explore the latest research articles and publications in the field of neuroscience contributed by our lab members.

- **Blogs:** Listen through podcasts hosted by Jim Stellar with an array of guests in various fields.

- **Publications:** Read through the details or purchase a copy of work produced by lab founder, Jim Stellar.

- **Projects/Research Areas:** Dive into various research areas, learn about ongoing projects, and discover our contributions to specific subfields of neuroscience.

- **Contact Us:** Get in touch with us through our contact form for inquiries, collaboration opportunities, or any other queries.

## Contributing

We welcome contributions from the community to help improve NeuroExed. If you have discovered a bug, want to propose a new feature, or have suggestions for enhancements, please feel free to open an issue or submit a pull request. We value your input and look forward to collaborating with you.

## License

The NeuroExed web application is open-source and available under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback regarding the NeuroExed web application, please reach out to us at:

- Email: devinobrien@icloud.com

Thank you for your interest in NeuroExed, and we hope you find our web application valuable in your journey through neuroscience!
