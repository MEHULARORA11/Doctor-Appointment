import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), 'api/.env') });

import { PrismaClient, UserRole, Day, Gender, paymentStatus, prescriptionStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

console.log('Connecting to database:', (process.env.DATABASE_URL || '').replace(/:[^:@]+@/, ':***@'));
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting comprehensive database seeding...');

    // 1. Clean existing records to avoid conflicts
    await prisma.medicine.deleteMany();
    await prisma.prescription.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.appointments.deleteMany();
    await prisma.scheduleDay.deleteMany();
    await prisma.doctorTimeSlot.deleteMany();
    await prisma.reviews.deleteMany();
    await prisma.favourites.deleteMany();
    await prisma.blogs.deleteMany();
    await prisma.auth.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.patient.deleteMany();

    console.log('🧹 Cleaned existing tables.');

    // Common hashed passwords
    const standardPassword = await bcrypt.hash('123456', 12);
    const adminPassword = await bcrypt.hash('admin123', 12);

    // 2. Create Doctors
    const doctorsData = [
        {
            firstName: 'Sarah',
            lastName: 'Jenkins',
            email: 'doctor@gmail.com', // Primary demo doctor
            phone: '+1 (555) 234-5678',
            gender: Gender.female,
            dob: '1982-05-14',
            biography: 'Dr. Sarah Jenkins is a board-certified Cardiologist with over 12 years of clinical excellence in preventive cardiology, heart rhythm management, and echocardiography.',
            clinicName: 'CardioCare Specialist Clinic',
            clinicAddress: '102 Heart Beat Ave, Suite 400',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001',
            price: '150',
            services: 'Cardiac Consultation, ECG, Echocardiogram, Heart Health Screening',
            specialization: 'Cardiologist',
            degree: 'MBBS, MD (Cardiology), FACC',
            college: 'Johns Hopkins School of Medicine',
            completionYear: '2010',
            experience: '12',
            designation: 'Senior Consultant Cardiologist',
            award: 'Excellence in Cardiovascular Medicine',
            awardYear: '2021',
            registration: 'MED-NY-84920',
            year: '2012',
            experienceHospitalName: 'Mount Sinai Hospital',
            expericenceStart: '2012',
            expericenceEnd: 'Present',
            verified: true,
            img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
        },
        {
            firstName: 'David',
            lastName: 'Chen',
            email: 'david.chen@gmail.com',
            phone: '+1 (555) 345-6789',
            gender: Gender.male,
            dob: '1979-09-21',
            biography: 'Dr. David Chen is an esteemed Neurologist specializing in neurodegenerative disorders, headache management, and stroke rehabilitation.',
            clinicName: 'NeuroHealth Institute',
            clinicAddress: '450 Brain Health Parkway',
            city: 'Boston',
            state: 'MA',
            country: 'USA',
            postalCode: '02115',
            price: '180',
            services: 'Neurological Assessment, EEG, Migraine Therapy, Nerve Conduction Studies',
            specialization: 'Neurologist',
            degree: 'MD, PhD (Neurosciences)',
            college: 'Harvard Medical School',
            completionYear: '2007',
            experience: '15',
            designation: 'Director of Clinical Neurology',
            award: 'Distinguished Neurologist of the Year',
            awardYear: '2020',
            registration: 'MED-MA-67104',
            year: '2009',
            experienceHospitalName: 'Massachusetts General Hospital',
            expericenceStart: '2009',
            expericenceEnd: 'Present',
            verified: true,
            img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        },
        {
            firstName: 'Emily',
            lastName: 'Rodriguez',
            email: 'emily.rodriguez@gmail.com',
            phone: '+1 (555) 456-7890',
            gender: Gender.female,
            dob: '1986-03-11',
            biography: 'Dr. Emily Rodriguez is a passionate Dermatologist with extensive expertise in clinical dermatology, acne treatments, skin cancer screenings, and laser therapies.',
            clinicName: 'Dermacare Glow Center',
            clinicAddress: '780 Sunset Boulevard',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            postalCode: '90028',
            price: '120',
            services: 'Skin Health Check, Acne Treatments, Mole Mapping, Dermatoscopy',
            specialization: 'Dermatologist',
            degree: 'MD, Board Certified Dermatologist',
            college: 'Stanford University School of Medicine',
            completionYear: '2014',
            experience: '8',
            designation: 'Associate Professor of Dermatology',
            award: 'Top Dermatologist Award',
            awardYear: '2022',
            registration: 'MED-CA-93812',
            year: '2015',
            experienceHospitalName: 'Cedars-Sinai Medical Center',
            expericenceStart: '2015',
            expericenceEnd: 'Present',
            verified: true,
            img: 'https://images.unsplash.com/photo-1594824813576-905ff57a9477?auto=format&fit=crop&w=600&q=80',
        },
        {
            firstName: 'Mehul',
            lastName: 'Arora',
            email: 'mehul.doctor@gmail.com',
            phone: '+1 (555) 789-0123',
            gender: Gender.male,
            dob: '1985-07-19',
            biography: 'Dr. Mehul Arora is a senior specialist in comprehensive dental surgery, smile design, restorative dentistry, and dental implants.',
            clinicName: 'Elite Smiles Dental Clinic',
            clinicAddress: '220 Broadway Street',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94102',
            price: '130',
            services: 'Teeth Whitening, Dental Implants, Root Canal, Orthodontics, Veneers',
            specialization: 'Dentist',
            degree: 'BDS, MDS (Prosthodontics)',
            college: 'UCSF School of Dentistry',
            completionYear: '2012',
            experience: '10',
            designation: 'Head of Dental Surgery',
            award: 'International Smile Excellence Award',
            awardYear: '2023',
            registration: 'MED-CA-44910',
            year: '2013',
            experienceHospitalName: 'UCSF Medical Center',
            expericenceStart: '2014',
            expericenceEnd: 'Present',
            verified: true,
            img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
        },
        {
            firstName: 'Lisa',
            lastName: 'Patel',
            email: 'lisa.patel@gmail.com',
            phone: '+1 (555) 567-8901',
            gender: Gender.female,
            dob: '1983-11-28',
            biography: 'Dr. Lisa Patel is an empathetic Pediatrician dedicated to neonatal care, child development milestones, vaccinations, and adolescent wellness.',
            clinicName: 'Little Smiles Pediatric Clinic',
            clinicAddress: '55 Childrens Way',
            city: 'Chicago',
            state: 'IL',
            country: 'USA',
            postalCode: '60611',
            price: '100',
            services: 'Well-Child Visits, Immunizations, Pediatric Nutrition, Developmental Check',
            specialization: 'Pediatrician',
            degree: 'MBBS, MD (Pediatrics), FAAP',
            college: 'Northwestern University Feinberg School of Medicine',
            completionYear: '2011',
            experience: '11',
            designation: 'Chief of Pediatric Services',
            award: 'Community Pediatric Care Hero',
            awardYear: '2021',
            registration: 'MED-IL-29103',
            year: '2012',
            experienceHospitalName: 'Ann & Robert H. Lurie Children Hospital',
            expericenceStart: '2012',
            expericenceEnd: 'Present',
            verified: true,
            img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
        }
    ];

    const createdDoctors = [];
    for (const doc of doctorsData) {
        const createdDoctor = await prisma.doctor.create({
            data: doc
        });
        createdDoctors.push(createdDoctor);

        // Create Auth account for doctor
        await prisma.auth.create({
            data: {
                email: doc.email,
                password: standardPassword,
                role: UserRole.doctor,
                userId: createdDoctor.id,
                isDemo: false
            }
        });

        // Create Doctor Time Slots for Monday, Wednesday, Friday
        const days = [Day.monday, Day.tuesday, Day.wednesday, Day.thursday, Day.friday];
        for (const day of days) {
            await prisma.doctorTimeSlot.create({
                data: {
                    doctorId: createdDoctor.id,
                    day: day,
                    weekDay: day.toString(),
                    maximumPatient: 10,
                    timeSlot: {
                        create: [
                            { startTime: '09:00 AM', endTime: '10:00 AM' },
                            { startTime: '10:00 AM', endTime: '11:00 AM' },
                            { startTime: '02:00 PM', endTime: '03:00 PM' },
                            { startTime: '04:00 PM', endTime: '05:00 PM' }
                        ]
                    }
                }
            });
        }
    }
    console.log(`👨‍⚕️ Created ${createdDoctors.length} doctors with full schedules & auth accounts.`);

    // 3. Create Primary Admin Account (mehularora505@gmail.com)
    const adminEmail = 'mehularora505@gmail.com';
    await prisma.auth.create({
        data: {
            email: adminEmail,
            password: adminPassword,
            role: UserRole.admin,
            userId: createdDoctors[0].id, // Linked to top doctor for convenience
            isDemo: false
        }
    });
    console.log(`👑 Created Primary Admin: ${adminEmail} (passwordless enabled).`);

    // Also create secondary demo admin (admin@gmail.com)
    await prisma.auth.create({
        data: {
            email: 'admin@gmail.com',
            password: standardPassword,
            role: UserRole.admin,
            isDemo: false
        }
    });

    // 4. Create Patients
    const patientsData = [
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'patient@gmail.com', // Primary demo patient
            mobile: '+1 (555) 111-2222',
            gender: 'female',
            bloodGroup: 'A+',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            zipCode: '10001',
            address: '123 Park Avenue Apt 4B',
            dateOfBirth: new Date('1994-06-15'),
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
        },
        {
            firstName: 'John',
            lastName: 'Davis',
            email: 'john.davis@gmail.com',
            mobile: '+1 (555) 222-3333',
            gender: 'male',
            bloodGroup: 'O+',
            city: 'Boston',
            state: 'MA',
            country: 'USA',
            zipCode: '02115',
            address: '77 Beacon Street',
            dateOfBirth: new Date('1988-04-20'),
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        },
        {
            firstName: 'Maria',
            lastName: 'Garcia',
            email: 'maria.garcia@gmail.com',
            mobile: '+1 (555) 333-4444',
            gender: 'female',
            bloodGroup: 'B+',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            zipCode: '90028',
            address: '445 Hollywood Blvd',
            dateOfBirth: new Date('1992-09-10'),
            img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
        },
        {
            firstName: 'Robert',
            lastName: 'Taylor',
            email: 'robert.taylor@gmail.com',
            mobile: '+1 (555) 444-5555',
            gender: 'male',
            bloodGroup: 'AB+',
            city: 'Chicago',
            state: 'IL',
            country: 'USA',
            zipCode: '60611',
            address: '890 Michigan Ave',
            dateOfBirth: new Date('1982-12-05'),
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
        }
    ];

    const createdPatients = [];
    for (const pat of patientsData) {
        const createdPatient = await prisma.patient.create({
            data: pat
        });
        createdPatients.push(createdPatient);

        // Create Auth account for patient
        await prisma.auth.create({
            data: {
                email: pat.email,
                password: standardPassword,
                role: UserRole.patient,
                userId: createdPatient.id,
                isDemo: false
            }
        });
    }
    console.log(`🧑‍🤝‍🧑 Created ${createdPatients.length} patients with auth accounts.`);

    // 5. Create Realistic Appointments, Payments, & Prescriptions
    const doc1 = createdDoctors[0]; // Dr. Sarah Jenkins
    const doc2 = createdDoctors[1]; // Dr. David Chen
    const doc3 = createdDoctors[2]; // Dr. Emily Rodriguez
    const doc4 = createdDoctors[3]; // Dr. Mehul Arora

    const pat1 = createdPatients[0]; // Jane Smith
    const pat2 = createdPatients[1]; // John Davis
    const pat3 = createdPatients[2]; // Maria Garcia

    const appointmentsPayload = [
        {
            trackingId: 'TRACK-2026-MED01',
            patientId: pat1.id,
            doctorId: doc1.id,
            firstName: pat1.firstName,
            lastName: pat1.lastName,
            email: pat1.email,
            phone: pat1.mobile,
            address: pat1.address,
            description: 'Experiencing occasional palpitations and mild shortness of breath during cardio workouts.',
            scheduleDate: '2026-11-20',
            scheduleTime: '10:00 AM',
            reasonForVisit: 'Cardiac Checkup & Evaluation',
            status: 'Completed',
            paymentStatus: paymentStatus.paid,
            prescriptionStatus: prescriptionStatus.issued,
            patientType: 'Outpatient',
            fee: 150,
            hasPrescription: true,
            disease: 'Mild Sinus Tachycardia',
            test: 'ECG 12-Lead, Lipid Profile',
            instruction: 'Avoid excessive caffeine, hydrate well, and take prescribed tablet in morning.',
            medicines: [
                { medicine: 'Metoprolol Tartrate', dosage: '25mg', frequency: 'Once Daily', duration: '30 Days' },
                { medicine: 'Omega-3 Fish Oil', dosage: '1000mg', frequency: 'Once Daily', duration: '60 Days' }
            ]
        },
        {
            trackingId: 'TRACK-2026-MED02',
            patientId: pat2.id,
            doctorId: doc2.id,
            firstName: pat2.firstName,
            lastName: pat2.lastName,
            email: pat2.email,
            phone: pat2.mobile,
            address: pat2.address,
            description: 'Severe throbbing headache on left side with light sensitivity lasting over 8 hours.',
            scheduleDate: '2026-11-22',
            scheduleTime: '02:00 PM',
            reasonForVisit: 'Neurological Consultation for Chronic Migraines',
            status: 'Completed',
            paymentStatus: paymentStatus.paid,
            prescriptionStatus: prescriptionStatus.issued,
            patientType: 'Outpatient',
            fee: 180,
            hasPrescription: true,
            disease: 'Acute Migraine without Aura',
            test: 'Brain MRI (Optional if symptoms persist)',
            instruction: 'Rest in a quiet, dark room during onset. Keep a migraine trigger diary.',
            medicines: [
                { medicine: 'Sumatriptan', dosage: '50mg', frequency: 'At onset of headache', duration: 'As needed' },
                { medicine: 'Naproxen Sodium', dosage: '500mg', frequency: 'Twice Daily with food', duration: '5 Days' }
            ]
        },
        {
            trackingId: 'TRACK-2026-MED03',
            patientId: pat3.id,
            doctorId: doc3.id,
            firstName: pat3.firstName,
            lastName: pat3.lastName,
            email: pat3.email,
            phone: pat3.mobile,
            address: pat3.address,
            description: 'Persistent dry red rash on both forearms after using a new laundry detergent.',
            scheduleDate: '2026-11-25',
            scheduleTime: '11:00 AM',
            reasonForVisit: 'Allergic Dermatitis Assessment',
            status: 'scheduled',
            paymentStatus: paymentStatus.paid,
            prescriptionStatus: prescriptionStatus.notIssued,
            patientType: 'Outpatient',
            fee: 120,
            hasPrescription: false
        },
        {
            trackingId: 'TRACK-2026-MED04',
            patientId: pat1.id,
            doctorId: doc4.id,
            firstName: pat1.firstName,
            lastName: pat1.lastName,
            email: pat1.email,
            phone: pat1.mobile,
            address: pat1.address,
            description: 'Routine 6-month dental scaling, polishing, and wisdom tooth sensitivity check.',
            scheduleDate: '2026-11-28',
            scheduleTime: '04:00 PM',
            reasonForVisit: 'Routine Dental Cleaning & Scaling',
            status: 'pending',
            paymentStatus: paymentStatus.unpaid,
            prescriptionStatus: prescriptionStatus.notIssued,
            patientType: 'Outpatient',
            fee: 130,
            hasPrescription: false
        },
        {
            trackingId: 'TRACK-2026-MED05',
            patientId: pat2.id,
            doctorId: doc1.id,
            firstName: pat2.firstName,
            lastName: pat2.lastName,
            email: pat2.email,
            phone: pat2.mobile,
            address: pat2.address,
            description: 'Follow-up consultation to check blood pressure trends after 1 month of medication.',
            scheduleDate: '2026-11-15',
            scheduleTime: '09:00 AM',
            reasonForVisit: 'Blood Pressure Monitoring Follow-up',
            status: 'Completed',
            paymentStatus: paymentStatus.paid,
            prescriptionStatus: prescriptionStatus.issued,
            patientType: 'Outpatient',
            fee: 150,
            hasPrescription: true,
            disease: 'Primary Hypertension (Well Controlled)',
            test: 'Renal Function Panel',
            instruction: 'Continue low sodium diet and regular moderate exercise.',
            medicines: [
                { medicine: 'Amlodipine Besylate', dosage: '5mg', frequency: 'Once Daily', duration: '60 Days' }
            ]
        }
    ];

    for (const apt of appointmentsPayload) {
        const createdApt = await prisma.appointments.create({
            data: {
                trackingId: apt.trackingId,
                patientId: apt.patientId,
                doctorId: apt.doctorId,
                firstName: apt.firstName,
                lastName: apt.lastName,
                email: apt.email,
                phone: apt.phone,
                address: apt.address,
                description: apt.description,
                scheduleDate: apt.scheduleDate,
                scheduleTime: apt.scheduleTime,
                reasonForVisit: apt.reasonForVisit,
                status: apt.status,
                paymentStatus: apt.paymentStatus,
                prescriptionStatus: apt.prescriptionStatus,
                patientType: apt.patientType
            }
        });

        // Add payment record
        await prisma.payment.create({
            data: {
                appointmentId: createdApt.id,
                paymentMethod: 'Credit Card (Stripe Online)',
                paymentType: 'Online',
                DoctorFee: apt.fee,
                bookingFee: 10,
                vat: 5,
                totalAmount: apt.fee + 15
            }
        });

        // Add Prescription if applicable
        if (apt.hasPrescription && apt.disease) {
            await prisma.prescription.create({
                data: {
                    doctorId: apt.doctorId,
                    patientId: apt.patientId,
                    appointmentId: createdApt.id,
                    disease: apt.disease,
                    test: apt.test,
                    instruction: apt.instruction,
                    isFullfilled: true,
                    followUpdate: '2026-12-15',
                    medicines: {
                        create: apt.medicines || []
                    }
                }
            });
        }
    }
    console.log(`📋 Created ${appointmentsPayload.length} appointments with payments and prescriptions.`);

    // 6. Create Reviews
    const reviewsData = [
        {
            doctorId: doc1.id,
            patientId: pat1.id,
            star: '5',
            isRecommended: true,
            description: 'Dr. Sarah Jenkins is an outstanding cardiologist. She listened attentively to all my concerns, conducted an exhaustive ECG, and explained everything clearly without rushing.',
            response: 'Thank you Jane! Glad to hear you are feeling better. Keep following the cardio exercise plan.'
        },
        {
            doctorId: doc2.id,
            patientId: pat2.id,
            star: '5',
            isRecommended: true,
            description: 'Exceptional neurologist. I suffered from debilitating migraines for years and Dr. Chen identified the root cause in the first visit. Highly recommended!',
            response: 'Thank you John. Proper diagnosis is the first step towards relief.'
        },
        {
            doctorId: doc3.id,
            patientId: pat3.id,
            star: '5',
            isRecommended: true,
            description: 'Dr. Rodriguez has transformed my skin. Very gentle, modern clinic, and gave me clear instructions that produced visible results within two weeks.',
            response: 'Thank you Maria! Keep up the daily sunscreen routine.'
        },
        {
            doctorId: doc4.id,
            patientId: pat1.id,
            star: '5',
            isRecommended: true,
            description: 'Dr. Mehul Arora is by far the best dental surgeon in town. Extremely gentle, state-of-the-art equipment, and zero discomfort during my procedure!',
            response: 'Thank you so much Jane! Happy to have given you your best smile.'
        }
    ];

    for (const rev of reviewsData) {
        await prisma.reviews.create({
            data: rev
        });
    }
    console.log(`⭐ Created ${reviewsData.length} patient reviews.`);

    // 7. Create Health Blogs
    const blogsData = [
        {
            title: '10 Proven Habits for Long-Term Cardiovascular Health',
            description: 'Heart disease remains one of the top health challenges globally. In this article, Dr. Sarah Jenkins breaks down simple, evidence-backed lifestyle changes: 30 minutes of aerobic activity daily, prioritizing omega-3 fats, managing stress with mindfulness, and getting annual screenings.',
            img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
            userId: doc1.id
        },
        {
            title: 'Demystifying Migraines: Early Warning Signs & Modern Therapies',
            description: 'Migraines are more than just bad headaches; they are neurological events. Learn how to recognize the prodrome phase, distinguish between aura and non-aura symptoms, and explore modern targeted therapies like CGRP inhibitors with Dr. David Chen.',
            img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
            userId: doc2.id
        },
        {
            title: 'The Ultimate Guide to Modern Oral Hygiene & Smile Aesthetics',
            description: 'From choosing between sonic and oscillating electric toothbrushes to the truth about charcoal whitening: Dr. Mehul Arora shares professional dental tips to protect your enamel and maintain healthy gums for life.',
            img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
            userId: doc4.id
        },
        {
            title: 'Healthy Skincare Barriers: What Dermatologists Actually Recommend',
            description: 'Over-exfoliating is one of the most common skincare mistakes today. Dr. Emily Rodriguez discusses the importance of ceramides, hyaluronic acid, and broad-spectrum SPF 50 for preserving your natural lipid barrier.',
            img: 'https://images.unsplash.com/photo-1512290900672-1f02e605d3cb?auto=format&fit=crop&w=800&q=80',
            userId: doc3.id
        }
    ];

    for (const b of blogsData) {
        await prisma.blogs.create({
            data: b
        });
    }
    console.log(`📰 Created ${blogsData.length} medical blogs.`);

    console.log('\n🎉 Database Seeding Completed Successfully!');
    console.log('----------------------------------------------------');
    console.log('📌 Primary Admin: mehularora505@gmail.com (No password needed)');
    console.log('📌 Demo Doctor:   doctor@gmail.com / 123456');
    console.log('📌 Demo Patient:  patient@gmail.com / 123456');
    console.log('📌 Track IDs:     TRACK-2026-MED01, TRACK-2026-MED02, TRACK-2026-MED03');
    console.log('----------------------------------------------------\n');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
