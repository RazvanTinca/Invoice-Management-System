import {Invoice, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'john.doe@example.com' },
        update: {},
        create: {
            email: 'john.doe@example.com',
            passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$xdAWONnvqBBxxAvXY+10ag$zReGAhIfTmba/ny4IxZdHY6acwYVNt9QjrZ5kiJk2FY', // Password: "john.doe"
            firstName: 'John',
            lastName: 'Doe'
        }
    })

    const invoices = [
        {
            customerId: user.id,
            dueDate: new Date('2025-06-15'),
            vendor: 'Acme Corp',
            title: 'Web Dev Project',
            description: 'Initial development phase',
            totalAmount: 4500.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-07-01'),
            vendor: 'Design Co.',
            title: 'UI Design',
            description: 'App UI Design',
            totalAmount: 2100.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-01'),
            vendor: 'Marketing Ltd.',
            title: 'SEO Services',
            description: 'Monthly SEO plan',
            totalAmount: 1800.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-20'),
            vendor: 'CloudHost',
            title: 'Hosting Services',
            description: 'Annual subscription',
            totalAmount: 300.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-07-10'),
            vendor: 'PrintX',
            title: 'Marketing Materials',
            description: 'Flyers and posters',
            totalAmount: 600.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-25'),
            vendor: 'DevTools Inc.',
            title: 'Dev Tools Subscription',
            description: 'Team license',
            totalAmount: 1200.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-05'),
            vendor: 'Content Creators',
            title: 'Copywriting',
            description: 'Blog and social posts',
            totalAmount: 900.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-30'),
            vendor: 'AnalyticsPro',
            title: 'Data Analytics',
            description: 'Dashboard setup',
            totalAmount: 2500.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-18'),
            vendor: 'VideoBoost',
            title: 'Video Production',
            description: 'Promo video',
            totalAmount: 3200.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-07-05'),
            vendor: 'Code Audit Ltd.',
            title: 'Code Review',
            description: 'Security audit',
            totalAmount: 1300.00,
            paid: false,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-22'),
            vendor: 'SocialBoost',
            title: 'Social Media Management',
            description: 'June campaign',
            totalAmount: 700.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-27'),
            vendor: 'Translatio',
            title: 'Translation Services',
            description: 'Multi-language site',
            totalAmount: 1100.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-12'),
            vendor: 'LegalEase',
            title: 'Contract Review',
            description: 'Review of business agreement',
            totalAmount: 800.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-07-02'),
            vendor: 'EmailPro',
            title: 'Email Campaign',
            description: 'Automated email flow',
            totalAmount: 950.00,
            paid: true,
        },
        {
            customerId: user.id,
            dueDate: new Date('2025-06-08'),
            vendor: 'PhotoShoot Inc.',
            title: 'Product Photography',
            description: 'Studio shoot',
            totalAmount: 1600.00,
            paid: true,
        }
    ] as Invoice[]

    await prisma.invoice.createMany({ data: invoices })
}

main()
    .then(() => {
        console.log('✅ Seed completed: 15 invoices added.')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error('❌ Error while seeding:', e)
        return prisma.$disconnect()
    })