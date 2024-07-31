const fromFormToServer = personInForm => ({
    type: [
        personInForm.isForeign ? 'foreign' : null,
        personInForm.isJuridical ? 'juridical' : 'physical',
    ].filter(Boolean).join('_'),
    tin: personInForm.isForeign ? null : personInForm.tin,
    name: personInForm.isJuridical ? null : personInForm.title,
    foreign_tin: personInForm.isForeign ? personInForm.tin : null,
    company_title: personInForm.isJuridical ? personInForm.title : null,
});


test('отечественное юридическое лицо', () => {
    const personInForm = {
        isForeign: false,
        isJuridical: true,
        title: 'Компания N',
        tin: '111111111'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'juridical',
        tin: '111111111',
        name: null,
        foreign_tin: null,
        company_title: 'Компания N'
    });
});

test('отечественное физическое лицо', () => {
    const personInForm = {
        isForeign: false,
        isJuridical: false,
        title: 'Иван Иванов',
        tin: '1029384756'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'physical',
        tin: '1029384756',
        name: 'Иван Иванов',
        foreign_tin: null,
        company_title: null
    });
});

test('иностранное юридическое лицо', () => {
    const personInForm = {
        isForeign: true,
        isJuridical: true,
        title: 'Company N',
        tin: '1234-5678'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'foreign_juridical',
        tin: null,
        name: null,
        foreign_tin: '1234-5678',
        company_title: 'Company N'
    });
});

test('иностранное физическое лицо', () => {
    const personInForm = {
        isForeign: true,
        isJuridical: false,
        title: 'Bob Smith',
        tin: '8765-4321'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'foreign_physical',
        tin: null,
        name: 'Bob Smith',
        foreign_tin: '8765-4321',
        company_title: null
    });
});

test('иностранное лицо', () => {
    const personInForm = {
        isForeign: true,
        isJuridical: null,
        title: 'Bob Smith',
        tin: '8765-4321'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: null,
        tin: null,
        name: 'Bob Smith',
        foreign_tin: '8765-4321',
        company_title: null
    });
});

test('отечественное лицо', () => {
    const personInForm = {
        isForeign: false,
        isJuridical: null,
        title: 'Иван Иванов',
        tin: '1029384756'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: null,
        tin: null,
        name: 'Иван Иванов',
        foreign_tin: '1029384756',
        company_title: null
    });
});

test('физическое лицо', () => {
    const personInForm = {
        isForeign: null,
        isJuridical: false,
        title: null,
        tin: '8765-4321'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'physical',
        tin: null,
        name: null,
        foreign_tin: '8765-4321',
        company_title: null
    });
});

test('юридическое лицо', () => {
    const personInForm = {
        isForeign: null,
        isJuridical: true,
        title: null,
        tin: '8765-4321'
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: 'juridical',
        tin: null,
        name: null,
        foreign_tin: '8765-4321',
        company_title: null
    });
});

test('пустая форма', () => {
    const personInForm = {
        isForeign: null,
        isJuridical: null,
        title: null,
        tin: null
    };
    const result = fromFormToServer(personInForm);
    expect(result).toEqual({
        type: null,
        tin: null,
        name: null,
        foreign_tin: null,
        company_title: null
    });
});