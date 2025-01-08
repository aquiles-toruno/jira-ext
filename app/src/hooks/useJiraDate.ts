const formatDate = (noFormatDate?: string): string => {
    if(noFormatDate == undefined)
        return '';
    
    console.log('noFormatDate', noFormatDate)
    const weeksMatch = noFormatDate.match(/(\d+)w/);
    const daysMatch = noFormatDate.match(/(\d+)d/);
    const hoursMatch = noFormatDate.match(/(\d+)h/);
    const minutesMatch = noFormatDate.match(/(\d+)m/);

    const weeks = weeksMatch ? `${weeksMatch[1]} weeks` : '';
    const days = daysMatch ? `${daysMatch[1]} days` : '';
    const hours = hoursMatch ? `${hoursMatch[1]} hours` : '';
    const minutes = minutesMatch ? `${minutesMatch[1]} minutes` : '';

    let readableDate = [weeks, days, hours, minutes].filter(Boolean).join(', ');
    return readableDate;
}

export default function useJiraDate() {
    return { formatDate };
}
