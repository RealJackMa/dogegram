function fetchImages() {
    fetch("http://localhost:3000/api/v1/images")
        .then(response => response.json())
        .then(images => showImages(images))
}

function showImages(images) {
    images.forEach(image => displayImage(image))
}

function displayImage(image) {

    let h2 = document.querySelector("h2")
    h2.innerText = image.title

    let img = document.querySelector(".image")
    img.src = image.url

    let span = document.querySelector(".likes")
    span.innerText = image.likes + " Likes"

    let ul = document.querySelector(".comments")
    ul.textContent = ""

    // Delete Comment by Clicking
    ul.addEventListener("click", e => {
        e.target.remove()
    })

    // Display All Comments
    image.comments.map(comment => comment.content).forEach(function (item) {
        let li = document.createElement("li")
        let text = document.createTextNode(item)
        li.append(text)
        ul.append(li)
    })

    // Like Button For Image
    let button = document.querySelector(".like-button")

    button.addEventListener("click", () => {
        fetch("http://localhost:3000/api/v1/images/" + image.id, {
            mode: 'no-cors',
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: ++image.likes
            })
        })
            .then(response => response.json())
            .then(updatedImage => {
                span.innerText = updatedImage.likes + " Likes"
                image = updatedImage
            })
    })

    // debugger

    let form = document.querySelector(".comment-form")
    let input = document.querySelector(".comment-input")

    // Add New Comment
    form.addEventListener("submit", () => {
        event.preventDefault()

        fetch("http://localhost:3000/api/v1/comments", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: event.target[0].value,
                imageId: image.id
            })
        })
        .then(response => response.json())
        .then(newComment => {
            let li = document.createElement("li")
            li.textContent = newComment.content
            ul.appendChild(li)
            input.value = ""
        })
    })
}

fetchImages()