# Contributing Guidelines

Thank you for considering contributing to CYPHLO-FN! Whether you're fixing a bug, implementing a new feature, or suggesting improvements, your contributions are welcome.

## Getting Started

1. Fork the repository.

2. Clone your fork to your local machine:

   ```bash
   git clone https://github.com/Kevin-ishimwe/cyphlo-fn.git
   ```

   ```bash
   cd your-project
   ```

3. Set up the development environment:

   ```bash
   npm install
   ```

4. To run the development server, use the following command:

   ```
   npm run dev
   ```

5. Create a new branch for your contribution:

   ```
   git checkout -b {story type}-{story summary}-{pivotal tracker/trello id}
   ```

   ### story type - Indicates the context of the branch and should be one of the following:

   ft == Feature
   bg == Bug
   ch == Chore

   ### story summary - Short 2-3 words summary about what the branch contains

   pivotal tracker/Trello story id - The Id of the pivotal tracker/Trello story associated with the commit.

   example:

   ```
   ft-resources-rest-endpoints-0408
   ```

## Making Changes

- Make your changes and ensure that your code follows the project's coding standards.

- Test your changes thoroughly.

## Submitting Changes

1. Commit your changes:

   ```
   git commit -m "<type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>"
   ```

   example:

   ```
   feat(kafka): implement exactly once delivery
    - ensure every event published to Kafka is delivered precisely once
    - implement error handling for failed delivery

    [Delivers #130635935]
   ```

2. Push your changes to your fork:

   ```bash
   git push origin feature-or-fix-branch
   ```

3. Open a pull request on the [main repository](https://github.com/Kevin-ishimwe/cyphlo-fn.git).
   It is our belief that PR reviews should not negatively impact a team's ability to deliver features. PRs that take too much time to get reviewed can hinder on a team's progress. As such, we practice the following behaviours when raising PRs:

   ```
   #### What does this PR do?

   #### Description of Task to be completed?

   #### How should this be manually tested?

   #### Any background context you want to provide?

   #### What are the relevant pivotal tracker/Trello stories?

   #### Screenshots (if appropriate)

   #### Questions:
   ```

## Code Review

All contributions will be reviewed, and feedback will be provided. Be ready to address any comments or make necessary changes.

## Style Guide

Please follow the project's coding style and conventions. If there's uncertainty, feel free to ask for guidance.

## Acknowledgments

- Contributors will be acknowledged in the project's README. Thank you for your valuable contributions!

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). Please adhere to it in all your interactions with the project.

# License

This project is licensed under the [APACHE License](http://www.apache.org/licenses/LICENSE-2.0).
Happy coding!

![coding gif](https://blogs.sap.com/wp-content/uploads/2019/09/tenor.gif)