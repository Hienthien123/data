export const AdminMenu = [
    {
        path: '',
        text: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        children: [
            {
                path: '/admin/dashboard',
                text: 'Dashboard',
                icon: 'fas fa-bell',
            },
            {
                path: '/admin/dashboard2',
                text: 'Dashboard 2',
                icon: 'fas fa-bell',
            },
            {
                path: '/admin/dashboard3',
                text: 'Dashboard 3',
                icon: 'fas fa-bell',
            }
        ]
    },
    {
        path: '/admin/test',
        text: 'Test Page',
        icon: 'fas fa-bell',
        children: []
    },
    {
        path: '',
        text: 'Quản lý học viên',
        icon: 'fas fa-user-graduate',
        children: [
            {
                path: '/admin/students',
                text: 'Danh sách học viên',
                icon: 'fas fa-user-graduate',
                children: []
            },
        ]
    },
    {
        path: '',
        text: 'Quản lý học vụ',
        icon: 'fa-solid fa-book',
        children: [
            {
                path: '/admin/grade',
                text: 'Khối học',
                icon: 'fas fa-book-open',
                children: []
            },
            {
                path: '/admin/subject-group',
                text: 'Ngành học',
                icon: 'fas fa-code-branch',
                children: []
            },
            {
                path: '/admin/mon-hoc',
                text: 'Môn học',
                icon: 'fa-solid fa-book',
                children: []
            },
            {
                path: '/admin/class',
                text: 'Lớp học',
                icon: 'fa-solid fa-book-tanakh',
                children: []
            },
        ]
    },
    {
        path: '/admin/tuitions',
        text: 'Mức học phí',
        icon: 'fa-solid fa-money-check-dollar',
        children: [
            {
                path: '/admin/tuitions/studenMapsTuition',
                text: 'Thu Học Phí Theo Học Sinh',
                icon: 'fa-thin fa-money-check-dollar',
            }
        ]
    },
    {
        path: '/admin/educationalYears',
        text: 'Năm học',
        icon: 'fa-regular fa-calendar-check',
        children: []
    },
    {
        path: '',
        text: 'Quản lý đơn vị',
        icon: 'fas fa-sitemap',
        children: [
            {
                path: '/admin/organization',
                text: 'Danh sách đơn vị',
                icon: 'fas fa-code-branch',
                children: []
            },
            {
                path: '/admin/titles',
                text: 'Quản lý chức danh',
                icon: 'fas fa-user-graduate',
                children: []
            },
            {
                path: '/admin/employees',
                text: 'Quản lý nhân sự',
                icon: 'fa-sharp fa-solid fa-person',
                children: []
            }

        ]
    }
]
