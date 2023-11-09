export const orderStatusColor = ({ status }) => {
    if(status === 'progress') {
        return 'pink'
    }
    if(status === 'completed') {
        return 'green'
    }
    if(status === 'cancelled') {
        return 'red'
    }
}