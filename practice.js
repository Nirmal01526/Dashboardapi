load = () =>{
    fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => console.log(json))
  var data =response => response.json();
  console.log('nirmal',data);
}
