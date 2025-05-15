fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const textSamplesContainer = document.getElementById('text-samples');
        const adaptationSamplesContainer = document.getElementById('adaptation-samples');

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

            // Add text samples (LJSpeech sections)
            if (section.samples) {
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

            // Add zero-shot adaptation section
            if (section.texts && section.models) {
                const adaptationTitle = document.createElement('h2');
                adaptationTitle.classList.add('section-title');
                adaptationTitle.textContent = section.title;
                adaptationSamplesContainer.appendChild(adaptationTitle);

                const adaptationDesc = document.createElement('p');
                adaptationDesc.classList.add('section-description');
                adaptationDesc.innerHTML = section.description;
                adaptationSamplesContainer.appendChild(adaptationDesc);

                // Create a table-like structure for zero-shot samples
                const table = document.createElement('div');
                table.classList.add('adaptation-table');

                // Add text headers
                const textHeader = document.createElement('div');
                textHeader.classList.add('text-row');
                section.texts.forEach(text => {
                    const textCell = document.createElement('div');
                    textCell.classList.add('text-cell');
                    textCell.innerHTML = `<p>${text}</p>`;
                    textHeader.appendChild(textCell);
                });
                table.appendChild(textHeader);

                // Add model rows
                section.models.forEach(model => {
                    const modelRow = document.createElement('div');
                    modelRow.classList.add('model-row');
                    modelRow.innerHTML = `<h3>${model.name}</h3>`;

                    section.texts.forEach(() => {
                        const audioCell = document.createElement('div');
                        audioCell.classList.add('audio-cell');
                        audioCell.innerHTML = `
                            <audio controls>
                                <source src="${model.file}" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        `;
                        modelRow.appendChild(audioCell);
                    });

                    table.appendChild(modelRow);
                });

                adaptationSamplesContainer.appendChild(table);
            }

            // Add a horizontal line after each section
            const hrElement = document.createElement('hr');
            textSamplesContainer.appendChild(hrElement);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
