const term = require('terminal-kit').terminal

module.exports = () => {

  const clear = () => {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J") // disables scrolling up
    console.clear()
  }

  const title = () => {
    term.bold.underline.red("Job Tracker\n")
  }

  const run = () => {

    clear()
    mainMenu()

  }

  const mainMenu = () => {

    title()

    const mainMenuItems = [
      "New Application",
      "View Applications",
      "Edit Application",
      "Delete Application",
      "Exit",
    ]

    term.singleColumnMenu(mainMenuItems, (error, response) => {

      if (response.selectedIndex == 4) {
        exit()
      }

      clear()
      mainMenu()
    })
  }

  const exit = () => {
    clear()
    term.red("Goodbye!\n")
    process.exit()
  }

  run()
}

