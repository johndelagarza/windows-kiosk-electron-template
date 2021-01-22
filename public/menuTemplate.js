const isMac = process.platform === "darwin";

const menuTemplate = () => ([
    {
        label: "File",
        submenu: [ 
            isMac ? { role: "close" } : { role: "quit" }
        ]
    },
    {
        label: 'Fullscreen',
        role: 'togglefullscreen'
    }
]);

module.exports = { menuTemplate };