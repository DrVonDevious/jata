const term = require('terminal-kit').terminal
const fs = require('fs')

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

  const saveJob = (job_data) => {
    fs.readFile('data/jobs.json', (error, data) => {
      let obj = JSON.parse(data)
      obj.jobs.push(job_data)
      let json = JSON.stringify(obj)
      fs.writeFile("data/jobs.json", json, (error) => {
        if (error) throw error
      });
    })
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

    saveJob(app)

    mainMenu()
  }

  const viewApps = async () => {

    clear()

    fs.readFile("data/jobs.json", (error, data) => {
      if (error) throw error
      let obj = JSON.parse(data)

      let jobMenuItems = obj.jobs.map(job => {
        return `Role: ${job.jobTitle}, Company: ${job.company}, Status: ${job.status}`
      })

      term.singleColumnMenu([...jobMenuItems, "Back"], (error, response) => {
        if (response.selectedText == "Back") {
          clear()
          mainMenu()
        }
      })
    })

  }

  const editApp = async () => {
    clear()
    mainMenu()
  }

  const deleteApp = async () => {
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
      switch (response.selectedIndex) {
        case 0:
          newApp()
          break
        case 1:
          viewApps()
          break
        case 2:
          editApp()
          break
        case 3:
          deleteApp()
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

