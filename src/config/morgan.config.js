module.exports = (env) => {
    let cnf = {}
    switch (env) {
        case 'development':
            cnf = {
                logs: 'dev',
            }
            break;
        case 'test':
            cnf = {
                logs: 'dev',
            }
            break;
        case 'production':
            cnf = {
                logs: 'production',
            }
            break;
        default:
            cnf = new Error(`no matching constants file found for env '${env}'`);
            break;
    }
    return cnf
};