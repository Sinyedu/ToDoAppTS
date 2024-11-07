import { Selector } from 'testcafe';

// Testing if you can add a task to the list
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
    .expect (Selector('body').hasClass('dark-mode')).ok();
});