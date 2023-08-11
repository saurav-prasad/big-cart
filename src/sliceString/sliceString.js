const sliceString = (str, n) => {
    return str?.length > n ? str.slice(0, str.charAt(n) === " " ? n - 1 : n) + "..." : str

}
export default sliceString