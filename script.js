fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const simpleSamplesContainer = document.getElementById('simple-samples');
        const textSamplesContainer = document.getElementById('text-samples');

        // Handle Groups (like MVC, StyleTTS 2, JETS, VITS)
        if (data.groups) {
            data.groups.forEach(group => {
                const groupRow = document.createElement('div');
                groupRow.classList.add('model-row');

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
                    groupRow.appendChild(modelElement);
                });

                simpleSamplesContainer.appendChild(groupRow);
            });
        }

        // Handle Texts (like Speech Diversity)
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

            // Handle normal text samples
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
        });
    })
    .catch(error => console.error('Error loading samples:', error));
