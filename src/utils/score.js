export const calculate = (row) => {

    const score = row.score;
    const credit = row.credit;
    if (score) {
        return Math.round(score / 100 * credit)
    } else {
        return "无分数";
    }

}

export const getScore = (scope) => {
    const score = scope.row.score;
    if (score === undefined || score === null) {
        return "无成绩";
    } else {
        return score;
    }
}

export const typeFromScore = (score) => {

    if (score === undefined || score === null) {
        return "info";
    } else if (score >90) {
        return "success";
    } else if (score > 60) {
        return "primary";
    } else  {
        return "danger";
    }
}