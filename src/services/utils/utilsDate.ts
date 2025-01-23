export class utilsDate {

    static stringParamToDate(dateParam: string) {
        const jour: number = Number(dateParam.slice(0,2))
        const mois: number = Number(dateParam.slice(2,4))
        const annee: number = Number(dateParam.slice(4,8))

        return new Date(annee, mois - 1, jour )
    }

    static roundToHour(date: Date): Date {
        const roundedDate = new Date(date);
        roundedDate.setMinutes(0, 0, 0);
        return roundedDate;
    }
}