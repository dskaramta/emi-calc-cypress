export function calculateEmi(P, R, N) {
    N = N * 12
    R = (R/12) /100
    const emi = [P * R * Math.pow(1+R, N)]/[Math.pow(1+R,N)-1]
    return Math.ceil(emi)
};

export function getNumber(pstring){
    pstring.replace("%", "")
    return parseFloat(pstring, 10)
}