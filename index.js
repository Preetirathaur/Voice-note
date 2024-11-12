

const body = document.querySelector('body');

let alertBox = document.getElementById('alertBox');
let alertBoxTimeOut;

const header = document.getElementById('header');
const heading_container = document.getElementById('heading-container');

const mode_icon = document.getElementById('mode-icon');
const toggle = document.getElementById('toggle');
const shareBtn = document.getElementById('shareBtn');
const img = document.getElementById('shareBtn-icon');

const modalBackdrop = document.getElementById('modal-backdrop');
const modalContainer = document.getElementById('modal-container');
const cancelModalBtn = document.getElementById('cancel-modal-btn');

const main = document.getElementById('main');
const content = document.getElementById('content');

const speechButtons = document.getElementById('speechButtons');

let languageOption = document.getElementById('languageSelect');

let speech_speak_btn = document.getElementById("speech-speakBtn");
let speech_pause_btn = document.getElementById("speech-pauseBtn");
let speech_play_btn = document.getElementById("speech-playBtn");
let speech_stop_btn = document.getElementById("speech-stopBtn");

let reqAlertTimeOut;
let section2 = document.getElementById('section-2');
let textCopyBtn = document.getElementById('textCopyBtn');
let textarea = document.querySelector("textarea");

let recStartBtn = document.getElementById('rec-startBtn');
let recStopBtn = document.getElementById('rec-stopBtn');

let fileNameInp = document.getElementById('fileNameInp');
let selectFileExtensionOption = document.getElementById('fileExtensionOptions');

let downloadBtn = document.getElementById('downloadBtn');
let downloadBtnInsideSpan = document.getElementById('as-text-file-span');
let downloadConfirmModalOverlay = document.getElementById('download-confirm-modal-overlay');
let downloadConfirmModal = document.getElementById('download-confirm-modal');
let DnCnfYesBtn = document.getElementById('dn-cnf-yes-btn');
let DnCnfNoBtn = document.getElementById('dn-cnf-no-btn');

let sr = window.SpeechRecognition || window.webkitSpeechRecognition;
let spRec = new sr();

spRec.continuous = true;
spRec.interimResults = true;
spRec.lang = `en`;

// dark and light mode code:
function toggleFunc() {
    body.classList.toggle('active');
    alertBox.classList.toggle('active');
    header.classList.toggle('active');
    heading_container.classList.toggle('active');
    toggle.classList.toggle('active');
    mode_icon.classList.toggle('active');
    shareBtn.classList.toggle('active');
    main.classList.toggle('active');
    content.classList.toggle('active');
    languageOption.classList.toggle('active');
    speechButtons.classList.toggle('active');
    document.getElementById('speech-speakBtn').classList.toggle('active');
    document.getElementById('speech-pauseBtn').classList.toggle('active');
    document.getElementById('speech-playBtn').classList.toggle('active');
    document.getElementById('speech-stopBtn').classList.toggle('active');
    section2.classList.toggle('active');
    textarea.classList.toggle('active');
    document.getElementById('section-3').classList.toggle('active');
    document.getElementById('div-1').classList.toggle('active');
    document.getElementById('select-div').classList.toggle('active');
    fileNameInp.classList.toggle('active');
    selectFileExtensionOption.classList.toggle('active');
    downloadBtn.classList.toggle('active');
    downloadConfirmModal.classList.toggle('active');
    document.getElementById('feedback-section').classList.toggle('active');
}

toggle.addEventListener("click", () => {
    toggleFunc();
    heading_container.classList.forEach(clsName => {
        if (clsName === "active") {
            heading_container.innerHTML = `<img src="images/voiceNote-logo2.svg" alt="logo">`;
        } else {
            heading_container.innerHTML = `<img src="images/voiceNote-logo1.svg" alt="logo">`;
        }
    });
});


// ------------------------------------------------------
// drag code:
let draggableBtn = document.getElementById('draggable-btn');

function onDrag({ movementX, movementY }) {
    let getStyleOfMain = window.getComputedStyle(main);
    let left = parseInt(getStyleOfMain.left);
    let top = parseInt(getStyleOfMain.top);
    main.style.left = `${left + movementX}px`;
    // main.style.top = `${top + movementY}px`;
}

function resetDragPosition() {
    main.style.left = `0px`;
    // main.style.top = `66px`;
}

draggableBtn.addEventListener("dblclick", () => {
    resetDragPosition();
});

draggableBtn.addEventListener("click", () => {
    // drag the main box
    draggableBtn.addEventListener("mousemove", onDrag);
    main.style.transition = '0s';
});

draggableBtn.addEventListener("mouseleave", () => {
    // stop dragging the main box
    main.style.transition = '0.5s';
    draggableBtn.removeEventListener("mousemove", onDrag);
});
// --------------------------------------------------------


// share button icon rotating code:
shareBtn.addEventListener("mouseenter", () => {
    img.style.transform = 'rotate(-30deg)';
});

shareBtn.addEventListener("mouseleave", () => {
    img.style.transform = 'rotate(0deg)';
});


// Modal showing/hiding code:
function showModal() {
    modalBackdrop.classList.add('active2');
    modalContainer.classList.add('active');
}

function hideModal() {
    modalBackdrop.classList.remove('active2');
    modalContainer.classList.remove('active');
}

shareBtn.addEventListener("click", () => showModal());

// modalBackdrop.addEventListener("click", (e) => {
//     if (e.target !== modalBackdrop) return;
//     hideModal();
// })

cancelModalBtn.addEventListener("click", () => hideModal());

document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        // hideModal();
        modalContainer.classList.toggle('active');
        modalBackdrop.classList.toggle('active2');
    }
});


// social share button linkings:
function social_share_opener(target_url) {
    window.navigator.clipboard.writeText(window.location.href);
    // window.navigator.clipboard.writeText(textarea.value);
    setTimeout(() => {
        window.open(target_url, "_blank");
    }, 100);
}

document.querySelector(".share-btns-container").addEventListener("click", (e) => {
    if (e.target.id === "twitter-share-btn" || e.target.id === "twitter-img") {
        console.log(e.target.id);
        social_share_opener("https://twitter.com/");
    } else if (e.target.id === "facebook-share-btn" || e.target.id === "facebook-img") {
        console.log(e.target.id);
        social_share_opener("https://www.facebook.com/");
    } else if (e.target.id === "instagram-share-btn" || e.target.id === "instagram-img") {
        console.log(e.target.id);
        social_share_opener("https://www.instagram.com/");
    } else if (e.target.id === "whatsapp-share-btn" || e.target.id === "whatsapp-img") {
        console.log(e.target.id);
        social_share_opener("https://web.whatsapp.com/");
    } else if (e.target.id === "email-share-btn" || e.target.id === "email-img") {
        console.log(e.target.id);
        social_share_opener("mailto:");
    } else if (e.target.id === "copy-link-btn" || e.target.id === "copy-img") {
        window.navigator.clipboard.writeText(window.location.href);
        showAlertBox('<span style="margin-right: 4px;">&#128640;</span> Copied!');
    }
});


// feedback form modal code:
const feedbackOpenBtn = document.getElementById('feedback-open-btn');
const feedbackCloseBtn = document.getElementById('feedback-close-btn');
const iframeOverlayDiv = document.getElementById('iframe-overlay-div');

function showFeedbackModal() {
    iframeOverlayDiv.classList.add('active2');
}

function closeFeedbackModal() {
    iframeOverlayDiv.classList.remove('active2');
}

feedbackOpenBtn.addEventListener("click", () => {
    showFeedbackModal();
});

feedbackCloseBtn.addEventListener("click", () => {
    closeFeedbackModal();
});


// copy site link code:
// function copyLink(linkTxt) {
//     navigator.clipboard.writeText(linkTxt);
// }

// document.getElementById('copy-link-btn').addEventListener("click", () => {
//     copyLink('file:///F:/webdev/program31/index.html');
//     showAlertBox('<span style="margin-right: 4px;">&#128640;</span> Copied!');
// });


// speech language selection code:
languageOption.addEventListener("change", () => {
    spRec.lang = `${languageOption.value}`;
});

// required field alert func. code:
function reqAlert(targetElementId) {
    let t = document.getElementById(targetElementId);
    t.style.visibility = 'visible';

    clearTimeout(reqAlertTimeOut);

    reqAlertTimeOut = setInterval(() => {
        t.style.visibility = 'hidden';
    }, 2000);
}


// text area value checker func. code:
function textAreaNotEmpty() {
    if (textarea.value == "") {
        speechSynthesis.cancel();
        return false;
    } else {
        return true;
    }
}


// placeholder blinker code:
setInterval(() => {
    if (textAreaNotEmpty()) {
        document.getElementById('placeholder_p').style.display = 'none';
    } else {
        document.getElementById('placeholder_p').style.display = 'block';
    }
}, 1000);


// show alert box code:
function showAlertBox(msg) {
    alertBox.innerHTML = msg;
    alertBox.style.transform = `translate(-50%, 0px)`;

    clearTimeout(alertBoxTimeOut);

    alertBoxTimeOut = setTimeout(() => {
        alertBox.style.transform = `translate(-50%, -60px)`;
    }, 2000);
}

// textarea content copy to clipboard code:
textCopyBtn.addEventListener("click", () => {
    if (textAreaNotEmpty()) {
        navigator.clipboard.writeText(textarea.value);
        showAlertBox('<span style="margin-right: 4px;">&#128640;</span> Copied!');
    } else {
        reqAlert('req1');
    }
})

// text to speech code:
speech_speak_btn.addEventListener("click", () => {
    let t2s = new SpeechSynthesisUtterance();

    if (textAreaNotEmpty()) {
        if ("speechSynthesis" in window) {
            if (spRec.lang == "en") {
                t2s.voice = speechSynthesis.getVoices()[6];
            }
            if (spRec.lang == "hi") {
                t2s.voice = speechSynthesis.getVoices()[12];
            }
            t2s.text = textarea.value;
            speechSynthesis.cancel();
            speechSynthesis.speak(t2s);
        } else {
            alert("This feature is not supported in this browser!");
        }
    }
    else {
        reqAlert("req1");
    }
});

speech_pause_btn.addEventListener("click", () => {
    if (textAreaNotEmpty()) {
        speechSynthesis.pause();
    } else {
        reqAlert("req1");
    }
});

speech_play_btn.addEventListener("click", () => {
    if (textAreaNotEmpty()) {
        speechSynthesis.resume();
    } else {
        reqAlert("req1");
    }
});

speech_stop_btn.addEventListener("click", () => {
    if (textAreaNotEmpty()) {
        speechSynthesis.cancel();
    } else {
        reqAlert("req1");
    }
});

// speech to text code:
recStartBtn.addEventListener("click", e => {
    spRec.start();
});

spRec.onresult = res => {
    let text = Array.from(res.results).map(r => r[0]).map(txt => txt.transcript)
        .join("");

    textarea.value = text;
}

recStopBtn.addEventListener("click", e => {
    spRec.stop();
});

// text to file download code:
selectFileExtensionOption.addEventListener("change", () => {
    let selectOptionText = selectFileExtensionOption.options[selectFileExtensionOption.selectedIndex].text;
    downloadBtnInsideSpan.innerText = `As ${selectOptionText.split(" ")[0]} File`;
});


downloadBtn.addEventListener("click", () => {
    if (textAreaNotEmpty() & fileNameInp.value !== "") {

        downloadConfirmModalOverlay.classList.add('active2');

    } else {

        let reqTM1;
        if (textAreaNotEmpty() == false) {
            // for req1:
            let t = document.getElementById('req1');
            t.style.visibility = 'visible';

            clearTimeout(reqTM1);

            reqTM1 = setInterval(() => {
                t.style.visibility = 'hidden';
            }, 2000);
        }

        let reqTM2;
        if (fileNameInp.value == "") {
            // for req2:
            let t = document.getElementById('req2');
            t.style.visibility = 'visible';

            clearTimeout(reqTM2);

            reqTM2 = setInterval(() => {
                t.style.visibility = 'hidden';
            }, 2000);
        }
    }
});


DnCnfYesBtn.addEventListener("click", () => {
    const blob = new Blob([textarea.value], { type: selectFileExtensionOption.value });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileNameInp.value;
    link.href = fileUrl;
    link.click();
    downloadConfirmModalOverlay.classList.remove('active2');
    showAlertBox('<img src="images/download-1.svg" alt="download" draggable="false">');
});

DnCnfNoBtn.addEventListener("click", () => {
    downloadConfirmModalOverlay.classList.remove('active2');
});

downloadConfirmModalOverlay.addEventListener("click", (e) => {
    if (e.target !== downloadConfirmModalOverlay) return;
    // else
    downloadConfirmModalOverlay.classList.remove('active2');
});


// bg svg eyes code:
document.querySelector("body").addEventListener("mousemove", eyeball);

function eyeball() {
    let eye = document.querySelectorAll('.eye i');
    eye.forEach(function (eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = "rotate(" + rot + "deg)";
    });
}