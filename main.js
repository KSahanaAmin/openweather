function GetInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = ""+newName.value+"";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=0aaa2463de00e1baaa3ba17394f0b4d2')
    .then(response => response.json())
    .then(data => {
        //Getting the temp values for each day
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp - 277.78).toFixed(0)+ "°";
            ydata.push(Number(data.list[i].main.temp - 277.78).toFixed(0));
        }
        chartIt()
        //Getting Weather Icons
        for(i = 0; i<5; i++){
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon
            +".png";
        }
        console.log(data)
    })
    .catch(err => alert("Something Went Wrong: "))
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}
for(i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    xdata.push(weekday[CheckDay(i)]);
}

//Function to display chart//
function chartIt(){
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xdata,
            datasets: [{
                label: 'Temperature',
                data:ydata,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
            }
        }
    });
}
