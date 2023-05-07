  export const calculateDuration = (start, end) => {
    const startHours = parseInt(start?.split(":")[0]);
    const startMinutes = parseInt(start?.split(":")[1].split(" ")[0]);
    const startPeriod = start?.split(" ")[1];
    const startTotalMinutes =
      ((startHours % 12) + (startPeriod === "PM" ? 12 : 0)) * 60 + startMinutes;

    const endHours = parseInt(end?.split(":")[0]);
    const endMinutes = parseInt(end?.split(":")[1].split(" ")[0]);
    const endPeriod = end?.split(" ")[1];
    const endTotalMinutes =
      ((endHours % 12) + (endPeriod === "PM" ? 12 : 0)) * 60 + endMinutes;

    const durationInMinutes = Math.abs(endTotalMinutes - startTotalMinutes);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hr ${minutes} min`;
  };