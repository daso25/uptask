import server from './server';
import colors from 'colors';

//6lDdI1vkH37aTaFS
//danielsalgadodaso

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(colors.cyan.bold(`Server is running on port ${PORT}`));
    }
);