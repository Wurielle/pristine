<template>
    <div id="app" class="pr-container pr-pb-32">
        <h1 class="pr-text-center pr-font-hairline pr-tracking-ultrawide pr-my-24">PRISTINE</h1>
        <fieldset>
            <legend>tables:</legend>
            <div class="pr-mb-base">
                <div class="table">
                    <table>
                        <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                name
                            </th>
                            <th>
                                age
                            </th>
                            <th>
                                location
                            </th>
                            <th>

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <img src="https://images.unsplash.com/photo-1539384894456-f4b7ceb0e407?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3849b2c9613fa713a1115faf7105588a&auto=format&fit=crop&w=800&q=80" alt="">
                            </td>
                            <td>
                                name
                            </td>
                            <td>
                                age
                            </td>
                            <td>
                                location
                            </td>
                            <td class="pr-text-right">
                                <button class="button button--primary">edit</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>lists:</legend>
            <ul class="pr-inline-block">
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
                <ul>
                    <li>hey</li>
                    <li>hey</li>
                    <li>hey</li>
                </ul>
            </ul>
            <ul class="pr-inline-block">
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
                <ol>
                    <li>hey</li>
                    <li>hey</li>
                    <li>hey</li>
                </ol>
            </ul>
            <ol class="pr-inline-block">
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
                <ul>
                    <li>hey</li>
                    <li>hey</li>
                    <li>hey</li>
                </ul>
            </ol>
            <ol class="pr-inline-block">
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
                <ol>
                    <li>hey</li>
                    <li>hey</li>
                    <li>hey</li>
                </ol>
            </ol>
        </fieldset>
        <fieldset>
            <legend>links:</legend>
            <div class="pr-mb-base">
                Sometimes texts <a href="">have links</a> just like this one.
            </div>
        </fieldset>
        <fieldset>
            <legend>buttons:</legend>
            <div>
                <button class="button pr-mr-base">Button</button>
                <button class="button pr-mr-base button--primary">Primary</button>
                <button class="button pr-mr-base button--secondary">Secondary</button>
                <button class="button pr-mr-base button--success">Success</button>
                <button class="button pr-mr-base button--danger">Danger</button>
                <button class="button pr-mr-base button--warning">Warning</button>
                <button class="button pr-mr-base button--info">Info</button>
            </div>
        </fieldset>
        <fieldset>
            <legend>Forms:</legend>
            <div class="pr-mb-base">
                <div class="pr-inline-block pr-mr-base">
                    <label for="checkbox1" class="checkbox"><input id="checkbox1" name="checkbox" type="checkbox">Chekbox</label>
                    <label for="checkbox2" class="checkbox"><input id="checkbox2" name="checkbox" type="checkbox">Chekbox</label>
                    <label for="checkbox3" class="checkbox"><input id="checkbox3" name="checkbox" type="checkbox">Chekbox</label>
                </div>
                <div class="pr-inline-block">
                    <label for="radio1" class="radio"><input id="radio1" name="radio" type="radio">Radio</label>
                    <label for="radio2" class="radio"><input id="radio2" name="radio" type="radio">Radio</label>
                    <label for="radio3" class="radio"><input id="radio3" name="radio" type="radio">Radio</label>
                </div>
            </div>
            <div>
                <label for="">Input</label>
                <input type="text" placeholder="Hello">
            </div>
            <div>
                <label for="">Primary</label>
                <input type="text" placeholder="Hello" class="input--primary">
            </div>
            <div>
                <label for="">Secondary</label>
                <input type="text" placeholder="Hello" class="input--secondary">
            </div>
            <div>
                <label for="">Success</label>
                <input type="text" placeholder="Hello" class="input--success">
            </div>
            <div>
                <label for="">Danger</label>
                <input type="text" placeholder="Hello" class="input--danger">
            </div>
            <div>
                <label for="">Warning</label>
                <input type="text" placeholder="Hello" class="input--warning">
            </div>
            <div>
                <label for="">Info</label>
                <input type="text" placeholder="Hello" class="input--info">
            </div>
            <div>
                <label for="">Hello</label>
                <div class="select">
                    <select name="" id="">
                        <option value="">hello worlddddd</option>
                        <option value="">hello</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="">Hello</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="pr-text-right">
                <button class="button pr-mr-base">cancel</button>
                <button class="button button--success">submit</button>
            </div>
        </fieldset>
        <fieldset>
            <legend>code:</legend>
            <div class="pr-mb-base">
                In this sentence <code>there is some code</code> that can be displayed.
            </div>
            <pre>
                <code>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorum eligendi esse et fugiat ipsum itaque laborum minima, molestiae optio provident reiciendis, saepe suscipit tenetur vel? Cum dolorum in provident?
                </code>
            </pre>
        </fieldset>
        <fieldset>
            <legend>misc:</legend>
            <div class="pr-mb-base">
                <img src="https://images.unsplash.com/photo-1539534161493-dc787e96425e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=642c3aa88c7f43a3573e48d9f5b56619&auto=format&fit=crop&w=1256&q=80"
                     alt="">
                <hr>
                <a href="https://unsplash.com/photos/hZ45xlsL7kM" target="_blank">@jan_pd</a>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';

    export default {
        name: 'app',
        components: {
            HelloWorld,
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
