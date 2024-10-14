document.addEventListener("DOMContentLoaded", function() {
    const browseButton = document.getElementById("browseButton");
    const fileInput = document.getElementById("fileInput");
    const uploadedFiles = document.querySelector(".wrapper");

    browseButton.addEventListener("click", function() {
        fileInput.click();
    });

    fileInput.addEventListener("change", function() {
        const files = this.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileReader = new FileReader();

            fileReader.onload = function(e) {
                const uploadedFileDiv = document.createElement("div");
                uploadedFileDiv.classList.add("uploaded");

                const fileIcon = document.createElement("i");
                fileIcon.classList.add("far", "fa-file-pdf");

                const fileInfoDiv = document.createElement("div");
                fileInfoDiv.classList.add("file");

                const fileNameDiv = document.createElement("div");
                fileNameDiv.classList.add("file__name");
                const fileName = document.createElement("p");
                fileName.textContent = file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name;
                fileNameDiv.appendChild(fileName);

                const removeButton = document.createElement("i");
                removeButton.classList.add("fas", "fa-times");
                removeButton.addEventListener("click", function() {
                    uploadedFileDiv.remove();
                });
                fileNameDiv.appendChild(removeButton);

                const progressBarDiv = document.createElement("div");
                progressBarDiv.classList.add("progress");
                const progressBar = document.createElement("div");
                progressBar.classList.add("progress-bar", "bg-success", "progress-bar-striped", "progress-bar-animated");
                progressBar.style.width = "0%";
                progressBarDiv.appendChild(progressBar);

                fileInfoDiv.appendChild(fileNameDiv);
                fileInfoDiv.appendChild(progressBarDiv);

                uploadedFileDiv.appendChild(fileIcon);
                uploadedFileDiv.appendChild(fileInfoDiv);

                uploadedFiles.appendChild(uploadedFileDiv);
                 let progress = 0;
                const progressInterval = setInterval(function() {
                    progress += 10;
                    progressBar.style.width = progress + "%";
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                         const alertDiv = document.createElement("span");
                        alertDiv.classList.add("alert", "alert-success", "mt-3","absolute");
                        alertDiv.textContent = "Upload completed!";
                        document.body.appendChild(alertDiv);
                         setTimeout(function() {
                            alertDiv.remove();
                        }, 3000);
                    }
                }, 500);
            };
            fileReader.readAsDataURL(file);
        }
    });
});
