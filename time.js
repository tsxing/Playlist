function updateTime() {
    const currentTime = new Date();
    
    // Get the current hour, minute, and second
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Determine AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12 (midnight)

    // Format minutes and seconds with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Format the time as hh:mm:ss AM/PM
    const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
    document.getElementById('time').innerText = formattedTime;

    //console.log(formattedTime);
}
  // Update the time every second
setInterval(updateTime, 1000);
  
