import { Selector } from 'testcafe';

fixture ("Adding a task to the list")
    .page("https://test.museum-trapholt.dk/todo/");

test("Adding a task", async t => {
    await t 
    .typeText('#todo-input' , 'Test task')
    .click ('#addbutton')
    .expect(Selector('li').innerText).contains('Test task')
})



test ("Editing a todo", async t => {
await t
.setNativeDialogHandler((type, text) => {
    switch (type) {
        case 'prompt':
            return 'Edited todo';
    }
})
.typeText('#todo-input' , 'Test task')
.click ('#addbutton')
.expect(Selector('li').innerText).contains('Test task')
.click('#editBtn')
.expect(Selector('li').innerText).contains('Edited todo');

});


test ("Dark theme toggle", async t => {
    await t
    .click ('#theme-toggle')
    .expect (Selector('body').hasClass('dark-mode')).ok()
    .click ('#theme-toggle')
    .expect (Selector('body').hasClass('dark-mode')).notOk();
});

test("Testing category selection for 'Living'", async t => {
    await t
        .typeText('#todo-input', 'Buy furniture')
        .click('#category-select')
        .click('#category-select option[value="Living"]') 
        .click('#addbutton');


    const lastTodoItem = Selector('#todo-list li').nth(-1);
    await t.expect(lastTodoItem.find('.category').innerText).eql('Living');
});

test("Testing category selection for 'Others'", async t => {
    await t
        .typeText('#todo-input', 'Book tickets')
        .click('#category-select')
        .click('#category-select option[value="Others"]')
        .click('#addbutton');

    const lastTodoItem = Selector('#todo-list li').nth(-1);
    await t.expect(lastTodoItem.find('.category').innerText).eql('Others');
});

test("Testing category selection for 'Groceries'", async t => {
    await t
        .typeText('#todo-input', 'Buy milk')
        .click('#category-select')
        .click('#category-select option[value="Groceries"]') 
        .click('#addbutton');

    const lastTodoItem = Selector('#todo-list li').nth(-1);
    await t.expect(lastTodoItem.find('.category').innerText).eql('Groceries');
});
