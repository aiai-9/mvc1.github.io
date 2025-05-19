fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const textSamplesContainer = document.getElementById('text-samples');

        // Handle "texts" sections
        data.texts.forEach(section => {
            const sectionTitle = document.createElement('h2');
            sectionTitle.classList.add('section-title');
            sectionTitle.textContent = section.title;
            textSamplesContainer.appendChild(sectionTitle);

            if (section.description) {
                const sectionDesc = document.createElement('p');
                sectionDesc.classList.add('section-description');
                sectionDesc.innerHTML = section.description;
                textSamplesContainer.appendChild(sectionDesc);
            }

            // Handle Speech Diversity
            if (section.title === "8. Speech Diversity") {
                section.samples.forEach(model => {
                    const modelRow = document.createElement('div');
                    modelRow.classList.add('model-row');

                    // Add model name
                    const modelTitle = document.createElement('h3');
                    modelTitle.textContent = model.name;
                    modelRow.appendChild(modelTitle);

                    // Add audio files
                    const audioContainer = document.createElement('div');
                    audioContainer.classList.add('audio-container');
                    
                    model.files.forEach(file => {
                        const audioElement = document.createElement('audio');
                        audioElement.controls = true;
                        const sourceElement = document.createElement('source');
                        sourceElement.src = file;
                        sourceElement.type = "audio/wav";
                        audioElement.appendChild(sourceElement);
                        audioContainer.appendChild(audioElement);
                    });

                    modelRow.appendChild(audioContainer);
                    textSamplesContainer.appendChild(modelRow);
                });
            } else {
                section.samples.forEach(sample => {
                    const textElement = document.createElement('div');
                    textElement.classList.add('text-block');
                    textElement.innerHTML = `<p><strong>Text:</strong> ${sample.text}</p>`;

                    const modelGroup = document.createElement('div');
                    modelGroup.classList.add('model-group');

                    sample.models.forEach(model => {
                        const modelElement = document.createElement('div');
                        modelElement.classList.add('model');
                        modelElement.innerHTML = `
                            <h3>${model.name}</h3>
                            <audio controls>
                                <source src="${model.file}" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        `;
                        modelGroup.appendChild(modelElement);
                    });

                    textElement.appendChild(modelGroup);
                    textSamplesContainer.appendChild(textElement);
                });
            }

            // Add a horizontal line after each section
            const hrElement = document.createElement('hr');
            textSamplesContainer.appendChild(hrElement);
        });

        // Handle "groups" sections
        data.groups.forEach(group => {
            const groupContainer = document.createElement('div');
            groupContainer.classList.add('group-container');

            group.samples.forEach(sample => {
                const modelElement = document.createElement('div');
                modelElement.classList.add('model');
                modelElement.innerHTML = `
                    <h3>${sample.model}</h3>
                    <audio controls>
                        <source src="${sample.file}" type="audio/wav">
                        Your browser does not support the audio element.
                    </audio>
                `;
                groupContainer.appendChild(modelElement);
            });

            textSamplesContainer.appendChild(groupContainer);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
