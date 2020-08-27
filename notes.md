# Notes

## 👩‍💻 General

What I did:

-   I used Next.js with TypeScript since I could include your open-sourced react-components without ejecting basic create-react-app setup. Next.js also includes smart code-splitting and some further performance improvements
-   I used your default prettier config which I found on your open-sourced react-components library

Some further improvement suggestions:

-   Use your default ESLint or TSLint settings for linting

## 🚀 Performance

Since you mentioned that performance is important for this application I did the following improvements:

-   Web performance → I shipped just as much code as needed by excluding unused SCSS classes from your design-system
-   Runtime performance of encryption and decryption → I implemented memoization to render already visited decrypted notes
-   Rendering of long lists → While there is no issue rendering several hundreds of notes in a list you will likely have many more notes saved later on. Rendering several thousand notes without virtualization makes the UI slow. I used react-window to avoid this problem

Some further improvements suggestions:

-   To ship even less code to the user I could have used Preact which is a lighter version of React.
-   Analyze web app traces using WebpageTest
-   Debug React.js performance by using react-devtools

## 👩‍🎨 Design

What I did:

-   Since creating the design for this application was not the primary focus. I integrated your open-sourced design-system and react-components into this project.
-   I tried to use as many utility classes as possible provided by your design system.

Some further improvement suggestions:

-   Make it easier to use on mobile devices
-   Integrate animations to have a more fluid user experience

## 🧪 Testing

What I did:

-   I integrated unit, integration, and e2e tests with jest and cypress.

Some further improvement suggestions:

-   Test with more fake data by using FakerJS for example
-   Add visual regression testing and test more edge cases like error states
-   Analyze coverage report and focus testing on important areas

## 👓 Accessibility

What I did:

-   Used semantic HTML
-   Run lighthouse a11y tests

Some further improvements suggestions:

-   Using a screen reader to test the application to include even more users
