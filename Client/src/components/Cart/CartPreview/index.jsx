import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function BadgeVisibility() {
    const [count, setCount] = React.useState(0);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <Box
            sx={{
                color: 'action.active',
                display: 'flex',
                flexDirection: 'column',
                '& > *': {
                    marginBottom: 2,
                },
                '& .MuiBadge-root': {
                    marginRight: 4,
                },
            }}
        >
            <div>
                <Badge color="secondary" badgeContent={count}>
                    <IconButton color="inherit">
                        <ShoppingCartIcon fontSize="large"/>
                    </IconButton>
                </Badge>
            </div>
        </Box>
    );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//
// export default function CartPreview({ incrementCount }) {
//     const [invisible, setInvisible] = React.useState(false);
//
//     const handleBadgeVisibility = () => {
//         setInvisible(!invisible);
//     };
//
//     return (
//         <Box
//             sx={{
//                 color: 'action.active',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 '& > *': {
//                     marginBottom: 2,
//                 },
//                 '& .MuiBadge-root': {
//                     marginRight: 4,
//                 },
//             }}
//         >
//             <div>
//                 {/* Sử dụng hàm được truyền từ component cha */}
//                 <Badge color="secondary" badgeContent={count}>
//                     <IconButton color="inherit" onClick={incrementCount}>
//                         <ShoppingCartIcon fontSize="large"/>
//                     </IconButton>
//                 </Badge>
//             </div>
//         </Box>
//     );
// }
