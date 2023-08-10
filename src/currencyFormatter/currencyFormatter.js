const currencyFormatter = (price) => {
    const formatter = new Intl.NumberFormat('en-IN', { currency: 'INR', })
    const main = formatter.format(price)
    return main
}
export default currencyFormatter