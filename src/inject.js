function injectCircuitVerseEmbedTool() {
    // Inject embed tool css
    fetch(chrome.runtime.getURL('/styles/embedTool.css')).then(r => r.text()).then(css => {
        var style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }).then(()=>{
        var div = document.createElement('div');
        div.id = "ungit-embeed-window";
        document.body.appendChild(div);

    })
}

injectCircuitVerseEmbedTool()
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received: " + JSON.stringify(request));
    const parent = document.getElementById("ungit-embeed-window");
    const title  = request.title;
    const message = request.message;
    const type = request.type || "info";
    // Insert an alert in parent
    const child = document.createElement("div");
    child.classList.add(type);
    child.classList.add("alert");
    const random_id = +"ungit_alert_" + Math.floor(Math.random() * 1000000000).toString();
    child.id = random_id;
    child.addEventListener("click", function () {
        const el = document.getElementById(random_id);
        if (el) {
            el.parentNode.removeChild(el);
        }
    })
    child.innerHTML = `
            <div class="content">
            <span class="alert-text">${message}</span>
        </div>
        <button class="close">
            <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1"
                 viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
        </button>
`;
    parent.appendChild(child);
})
