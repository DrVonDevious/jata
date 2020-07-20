const term = require('terminal-kit').terminal

module.exports = () => {

  const clear = () => {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J") // disables scrolling up
    console.clear()
  }

  const title = () => {
    term.bold.underline.red("JATA\n")
  }

  const run = () => {

    clear()
    mainMenu()

  }

  const newApp = async () => {

    let app = {
      jobTitle: "none",
      company: "none",
      status: "pending",
    }

    clear()

    term.green("Enter job title: ")
    let job_title = await term.inputField({}).promise
    clear()

    term.green("Enter company name: ")
    let company = await term.inputField({}).promise
    clear()

    app.company = company
    app.jobTitle = job_title

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
      switch (response.selectedIndex) {
        case 0:
          newApp()
          break
        case 4:
          exit()
          break
        default:
          clear()
          mainMenu()
          break
      }
    })
  }

  const exit = () => {
    clear()
    term.red("Goodbye!\n")
    process.exit()
  }

  run()
}

