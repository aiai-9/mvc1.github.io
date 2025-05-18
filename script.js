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

            // Handle multi-column layout for section 3
            if (Array.isArray(section.texts)) {
                const table = document.createElement('table');
                const headerRow = document.createElement('tr');
                
                // Add headers (Text samples)
                section.texts[0].text.forEach(text => {
                    const th = document.createElement('th');
                    th.innerHTML = `<p>${text}</p>`;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);
                
                // Add each model and its corresponding audio files
                section.texts[0].models.forEach(model => {
                    const row = document.createElement('tr');
                    model.files.forEach(file => {
                        const td = document.createElement('td');
                        td.innerHTML = `
                            <audio controls>
                                <source src="${file}" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        `;
                        row.appendChild(td);
                    });
                    table.appendChild(row);
                });
                
                textSamplesContainer.appendChild(table);
            }
        });
    })
    .catch(error => console.error('Error loading samples:', error));
