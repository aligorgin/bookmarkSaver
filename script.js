const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-URL');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// show modal, focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}


// modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
// for removing modal by clicking anywhere on the window
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// validate form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('please provide a valid web address');
        return false;
    }
    // valid
    return true;
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }else {
        // creat bookmarks array in localstorage
        bookmarks = [
            {
                name:'Jacinto Design',
                url: 'https://jacinto.design',
            },
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    console.log(bookmarks);
}

// handle data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    // essentially we are doing this for evaluate the code blow
    if (!validate(nameValue,urlValue)){
        // break out the function and not doing anything blow it
        return false;
    }
    const bookmark = {
        name:nameValue,
        url:urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// event listeners
bookmarkForm.addEventListener('submit', storeBookmark);

// on load, fetch bookmarks
fetchBookmarks();