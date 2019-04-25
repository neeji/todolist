(function () {
    var inputed_elements = 0;
    var inp = document.getElementById("inp");
    var btn = document.getElementById("btn");
    var result = document.getElementById("result");
    var store = {};

    on_refresh();

    function add_note_to_server() {
        // add data to the server then display it on the page
        var input_value = inp.value;
        fetch('/add_note', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ 'a': input_value, 'b': false })
        }).then(function (data) {
            data.json()
                .then(function (data) {
                    if (data.status == 200) {
                        //     // display(input_value);
                        //    // console.log(data);
                        display(data, () => {
                            store[data.id] = { 'todo': data.todo, 'done': false };
                            // console.log(store);
                            localStorage.setItem('tasks', JSON.stringify(store));

                        });
                    }
                    else {
                        alert("error occured check network connection.")
                    }
                })
        })
    }


    function display(data, cb) {
        var p = document.createElement('p');
        var span = document.createElement('span');
        var button = document.createElement('button');
        var check_box = document.createElement('input');
        var button_text = document.createTextNode("DELETE");
        var span_text = document.createTextNode(data.todo);
        /*-----------------------------------------------------------*/
        span.addEventListener("click", change_to_box);
        /*-----------------------------------------------------------*/
        p.setAttribute("id", data.id);
        button.appendChild(button_text);
        button.addEventListener("click", delete_element);
        check_box.setAttribute('type', 'checkbox');
        check_box.addEventListener("click", update_status_change);
        check_box.checked = data.done;
        span.appendChild(span_text);
        p.append(check_box);
        p.appendChild(span);
        p.appendChild(button);
        result.appendChild(p);
        cb();
    }
    function delete_element() {
        // remove form the server then remove from the page
        var id = $(this).parent().attr('id');
        var that = this;
        fetch('/delete_note', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ 'a': id })
        })
            .then(function (data) {
                if (data.status === 200) {
                    delete store[id];
                    localStorage.setItem('tasks', JSON.stringify(store));
                    $(that).parent().remove();
                } else {
                    console.log("error occured check network connection.");
                }
            })

    }

    function update_status_change() {
        var id = $(this).parent().attr('id');
        var status = $(this).is(':checked');
        var that = this;
        fetch('/update_status', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ 'a': id, 'b': status })
        }).then(function (data) {
            if (data.status === 200) {
                store[id]['done'] = status;
                // console.log(store[id]);
                localStorage.setItem('tasks', JSON.stringify(store));
                // console.log(status);
                return;
            } else {
                $(that).prop('checked', false);
                Console.log("error occured check network connection.")
            }
        })
    }

    function change_to_box() {
        var text = $(this).text();
        if (text == '' || text == 'UPDATE') {
            return;
        }
        var box = document.createElement('input');
        var button = document.createElement('button');
        var button_text = document.createTextNode('UPDATE');
        box.setAttribute('type', 'text');
        box.setAttribute("value", text);
        button.appendChild(button_text);
        button.addEventListener("click", update_todo);
        // console.log(this);
        // set text to none
        $(this).text('');
        // add input box to span.
        $(this).append(box);
        $(this).append(button);
    }

    function update_todo() {
        // console.log($(this).prev().val());
        // console.log($($(this).parent()).parent());
        var new_value = $(this).prev().val();
        var id = $($(this).parent()).parent().attr('id');
        var that = this;
        // console.log(id);
        fetch('/update_todo', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ 'a': id, 'b': new_value })
        }).then((data) => {
            if (data.status === 200) {
                // console.log("working fine")
                $(this).parent().text(new_value);
                store[id]['todo'] = new_value;
                localStorage.setItem('tasks', JSON.stringify(store));
                // console.log(store);
                // console.log(new_value);
            } else {
                console.log("error occured check network connection.")
            }
        })
    }


    function on_refresh() {
        // if (Object.keys(store).length == 0) {
        // store = JSON.parse(localStorage.getItem('tasks')) || {};
        // console.log(store);
        // if (Object.keys(store) == 0) {
            console.log(store);
            if (Object.keys(store).length == 0) {
                fetch('/get_data', {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                })
                    .then((data) => {
                        data.json()
                            .then((data) => {
                                // console.log(data);
                                store = {};
                                data.forEach(element => {
                                    // console.log(element);
                                    if (element.status == 0) {
                                        element.status = false;
                                    } else {
                                        element.status = true;
                                    }
                                    store[element.id] = { 'todo': element.todo, 'done': element.status };
                                    var data = { 'id': element.id, 'todo': element.todo, 'done': element.status };
                                    display(data, () => {
                                        console.log("added" + data.id + "successfully.");
                                    });
                                    data = {};

                                });
                                localStorage.setItem('tasks', JSON.stringify(store));

                            })
                    })
            }
        // } else {
        //     // store[element.id] = { 'todo': element.todo, 'done': element.status };

        //     // display(data, () => {
        //     //     console.log("added" + data.id + "successfully.");
        //     // });
        //     // data = {};

        // }
    }


    btn.onclick = function () {
        add_note_to_server();
        inp.value = '';
    }

})();