(function () {
    var inputed_elements = 0;
    var inp = document.getElementById("inp");
    var btn = document.getElementById("btn");
    var result = document.getElementById("result");

    btn.onclick = function () {
        var data = inp.value + ' ';
        var key = `id_${inputed_elements}`;
        fetch(`/add_note?q=${data}&k=${key}`)
            .then(function (d) {
                if (d.status == 200) {
                    var sec = document.createElement('section');
                    var p = document.createElement('p');
                    var text = document.createTextNode(data);
                    p.appendChild(text);
                    var bt = document.createElement('button');
                    var dt = document.createTextNode("DELETE NOTE");
                    bt.appendChild(dt);
                    bt.addEventListener("click", function () {
                        var del_key = $(this).parent().attr("id");
                        var that = this;
                        fetch(`/delete?k=${del_key}`)
                            .then(function (d) {
                                if (d.status == 200) {
                                    $(that).parent().remove();
                                }
                                else {
                                    alert('error in connecting with server please try again later.');
                                }
                            })
                    });
                    p.setAttribute("contentEditable", "true");
                    p.addEventListener("click", function () {
                        if ($('#update').length > 0) {
                            // it exists 
                            console.log("exists");
                            alert("first update the previous text");
                        }
                        else {
                            var up = document.createElement('button');
                            var ut = document.createTextNode("UPDATE NOTE");
                            up.appendChild(ut);
                            up.setAttribute("id", "update");
                            up.addEventListener("click", function () {
                                // console.log("yes it will work");
                                var temp = $(this).parent().children().first().text();
                                var key = $(this).parent().attr("id");
                                var that = this;
                                fetch(`/update?q=${temp}&k=${key}`)
                                    .then(function (d) {
                                        if (d.status == 200) {
                                            $(that).remove();
                                        } else {
                                            alert('error in connecting with server please try again later.');
                                        }
                                    })
                            });
                            $(this).parent().append(up);
                        }
                    })
                    sec.setAttribute("id", `id_${inputed_elements}`);
                    sec.appendChild(p);
                    sec.appendChild(bt);
                    $(result).prepend(sec);
                    inputed_elements = inputed_elements + 1;
                } else {
                    alert("error in connecting with server please try again later.");
                }
            })
    }


})();