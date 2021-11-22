# SeleniumJSExample2
Example test suite using Selenium for NodeJS. I prefer to use NodeJS with Selenium as the resulting test suite
tend to run ultra fast, and ultra stable. It is definitely a solution for large scale test automation.

This test suite uses the traditional Page Object Model pattern. It runs tests in sequence. 

Possible improvements: 
1. Store test data in a separate file or database.
2. Run tests in parallel.
3. Use a unit test framework for easy integration with CI/CD environment.
4. Use a reporting engine (eg., Extent Reports)
5. Use Selenium Webdriver Service so that tests can be run remotely.

### Step 1: Install NodeJS
Goto https://nodejs.org/en/ and install the LTS version.
After installing, test that NodeJs has been installed successfully by typing "node --version" in a Command Prompt.

### Step 2: Clone repository from Github 
git clone https://github.com/jredimer2/SeleniumJSExample2.git

### Step 3: In a Command Prompt window, cd to root folder of repository
For example: CD C:\Git\SeleniumJSExample2

### Step 4: Install dependencies and build app
In the Command Prompt window, type "npm install"

### Step 5: Run the test
In the Command Prompt window, type "node testcases"