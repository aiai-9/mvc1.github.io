fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const textSamplesContainer = document.getElementById('text-samples');

        data.texts.forEach(section => {
            // Add section title
            const sectionTitle = document.createElement('h2');
            sectionTitle.classList.add('section-title');
            sectionTitle.textContent = section.title;
            textSamplesContainer.appendChild(sectionTitle);

            // Add section description if available
            if (section.description) {
                const sectionDesc = document.createElement('p');
                sectionDesc.classList.add('section-description');
                sectionDesc.innerHTML = section.description;
                textSamplesContainer.appendChild(sectionDesc);
            }

            // Handle Speech Diversity Section
            if (section.title === "8. Speech Diversity") {
                section.models.forEach(model => {
                    // Create row for each model
                    const rowElement = document.createElement('div');
                    rowElement.classList.add('speech-row');

                    // Add model name
                    const modelName = document.createElement('div');
                    modelName.classList.add('model-name');
                    modelName.textContent = model.name;
                    rowElement.appendChild(modelName);

                    // Add audio files
                    model.files.forEach(file => {
                        const audioElement = document.createElement('div');
                        audioElement.classList.add('model');
                        audioElement.innerHTML = `
                            <audio controls>
                                <source src="${file}" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        `;
                        rowElement.appendChild(audioElement);
                    });

                    textSamplesContainer.appendChild(rowElement);
                });
            }

            // Add a horizontal line after each section
            const hrElement = document.createElement('hr');
            textSamplesContainer.appendChild(hrElement);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
