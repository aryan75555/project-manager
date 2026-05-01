# MongoDB Atlas Setup - Complete Guide in Hindi

## Step 1: Account Banao (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. **Sign Up** par click karo
3. Google se sign up karo (easiest)
4. Email verify karo

## Step 2: Cluster Banao (3 minutes)

1. Login karo
2. **Create** button par click karo
3. **Build a Cluster** select karo
4. Plan select karo:
   - "FREE TIER" select karo (0 cost!)
   - AWS + US region (by default)
   - **Create** click karo

⏳ 5-10 minutes wait karegi cluster create hone main

## Step 3: Connection String Get Karo (2 minutes)

1. Cluster create ho gaya toh "Connect" button click karo
2. **Connect your application** select karo
3. Language: **Node.js** select karo
4. Version: **4.0 or later** select karo
5. **Copy** button se connection string copy karo

String aise dikhega:
```
mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
```

⚠️ Username aur password apna set karo:
- Username: `aryan` (kuch bhi)
- Password: `yourpassword123` (strong password)

## Step 4: IP Whitelist (1 minute)

1. Left sidebar main "Network Access" par click karo
2. **Add IP Address** button click karo
3. **Allow access from anywhere** select karo (ALLOW ALL)
4. **Confirm** click karo

✅ Ab database ready hai!

## Connection String Format

```
mongodb+srv://aryan:yourpassword123@cluster0.mongodb.net/project-manager?retryWrites=true&w=majority
```

Iska use karenge backend main.

---

**Screenshot dekho aur exact wahi karo. 10 minutes main database ready!**
