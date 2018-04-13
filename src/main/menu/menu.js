export default function Menu({ app }) {
    return {
        label: 'Nitrogen',
        submenu: [{
            label: 'Quit',
            accelerator: 'Command+Q',
            click: app.quit
        }]
    }
}