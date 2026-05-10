use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Person {
    name: String,
    dept: String,
    phone: String,
    room: String,
    floor: String,
    email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Department {
    name: String,
    phone: String,
    head: String,
    floor: String,
    rooms: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UsefulNumber {
    name: String,
    number: String,
    hours: String,
    cat: String,
    icon: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AppData {
    personnel: Vec<Person>,
    departments: Vec<Department>,
    useful_numbers: Vec<UsefulNumber>,
}

#[tauri::command]
fn get_personnel() -> Vec<Person> {
    vec![
        Person { name: "Alice Marsh".into(), dept: "Engineering".into(), phone: "x2101".into(), room: "A-201".into(), floor: "2".into(), email: "a.marsh@org.int".into() },
        Person { name: "Ben Kowalski".into(), dept: "Engineering".into(), phone: "x2102".into(), room: "A-202".into(), floor: "2".into(), email: "b.kowalski@org.int".into() },
        Person { name: "Clara Stein".into(), dept: "Engineering".into(), phone: "x2103".into(), room: "A-204".into(), floor: "2".into(), email: "c.stein@org.int".into() },
        Person { name: "David Osei".into(), dept: "Engineering".into(), phone: "x2104".into(), room: "A-206".into(), floor: "2".into(), email: "d.osei@org.int".into() },
        Person { name: "Elena Vasquez".into(), dept: "HR".into(), phone: "x1201".into(), room: "B-101".into(), floor: "1".into(), email: "e.vasquez@org.int".into() },
        Person { name: "Frank Holt".into(), dept: "HR".into(), phone: "x1202".into(), room: "B-103".into(), floor: "1".into(), email: "f.holt@org.int".into() },
        Person { name: "Grace Kim".into(), dept: "Finance".into(), phone: "x3301".into(), room: "C-301".into(), floor: "3".into(), email: "g.kim@org.int".into() },
        Person { name: "Hassan Ali".into(), dept: "Finance".into(), phone: "x3302".into(), room: "C-302".into(), floor: "3".into(), email: "h.ali@org.int".into() },
        Person { name: "Irene Müller".into(), dept: "Finance".into(), phone: "x3303".into(), room: "C-303".into(), floor: "3".into(), email: "i.muller@org.int".into() },
        Person { name: "Jonas Berg".into(), dept: "Legal".into(), phone: "x4401".into(), room: "D-401".into(), floor: "4".into(), email: "j.berg@org.int".into() },
        Person { name: "Kira Santos".into(), dept: "Legal".into(), phone: "x4402".into(), room: "D-402".into(), floor: "4".into(), email: "k.santos@org.int".into() },
        Person { name: "Leo Fontaine".into(), dept: "Marketing".into(), phone: "x5501".into(), room: "E-115".into(), floor: "1".into(), email: "l.fontaine@org.int".into() },
        Person { name: "Maya Patel".into(), dept: "Marketing".into(), phone: "x5502".into(), room: "E-116".into(), floor: "1".into(), email: "m.patel@org.int".into() },
        Person { name: "Nico Andersen".into(), dept: "Marketing".into(), phone: "x5503".into(), room: "E-118".into(), floor: "1".into(), email: "n.andersen@org.int".into() },
        Person { name: "Olivia Grant".into(), dept: "IT Support".into(), phone: "x6601".into(), room: "F-001".into(), floor: "G".into(), email: "o.grant@org.int".into() },
        Person { name: "Paul Dubois".into(), dept: "IT Support".into(), phone: "x6602".into(), room: "F-002".into(), floor: "G".into(), email: "p.dubois@org.int".into() },
        Person { name: "Qi Lin".into(), dept: "IT Support".into(), phone: "x6603".into(), room: "F-003".into(), floor: "G".into(), email: "q.lin@org.int".into() },
        Person { name: "Rosa Ferreira".into(), dept: "Operations".into(), phone: "x7701".into(), room: "G-201".into(), floor: "2".into(), email: "r.ferreira@org.int".into() },
        Person { name: "Sam Novak".into(), dept: "Operations".into(), phone: "x7702".into(), room: "G-202".into(), floor: "2".into(), email: "s.novak@org.int".into() },
        Person { name: "Tina Öztürk".into(), dept: "Operations".into(), phone: "x7703".into(), room: "G-204".into(), floor: "2".into(), email: "t.ozturk@org.int".into() },
        Person { name: "Umar Shaikh".into(), dept: "Executive".into(), phone: "x0101".into(), room: "PH-01".into(), floor: "PH".into(), email: "u.shaikh@org.int".into() },
        Person { name: "Vera Lindqvist".into(), dept: "Executive".into(), phone: "x0102".into(), room: "PH-02".into(), floor: "PH".into(), email: "v.lindqvist@org.int".into() },
        Person { name: "Will Thornton".into(), dept: "Research".into(), phone: "x8801".into(), room: "H-301".into(), floor: "3".into(), email: "w.thornton@org.int".into() },
        Person { name: "Xiu Wang".into(), dept: "Research".into(), phone: "x8802".into(), room: "H-302".into(), floor: "3".into(), email: "x.wang@org.int".into() },
        Person { name: "Yara Ndiaye".into(), dept: "Research".into(), phone: "x8803".into(), room: "H-303".into(), floor: "3".into(), email: "y.ndiaye@org.int".into() },
        Person { name: "Zara Ivanova".into(), dept: "Research".into(), phone: "x8804".into(), room: "H-304".into(), floor: "3".into(), email: "z.ivanova@org.int".into() },
    ]
}

#[tauri::command]
fn get_departments() -> Vec<Department> {
    vec![
        Department { name: "Engineering".into(), phone: "x2100".into(), head: "Alice Marsh".into(), floor: "2".into(), rooms: "A-201–210".into() },
        Department { name: "HR".into(), phone: "x1200".into(), head: "Elena Vasquez".into(), floor: "1".into(), rooms: "B-101–115".into() },
        Department { name: "Finance".into(), phone: "x3300".into(), head: "Grace Kim".into(), floor: "3".into(), rooms: "C-301–315".into() },
        Department { name: "Legal".into(), phone: "x4400".into(), head: "Jonas Berg".into(), floor: "4".into(), rooms: "D-401–410".into() },
        Department { name: "Marketing".into(), phone: "x5500".into(), head: "Leo Fontaine".into(), floor: "1".into(), rooms: "E-115–130".into() },
        Department { name: "IT Support".into(), phone: "x6600".into(), head: "Olivia Grant".into(), floor: "G".into(), rooms: "F-001–010".into() },
        Department { name: "Operations".into(), phone: "x7700".into(), head: "Rosa Ferreira".into(), floor: "2".into(), rooms: "G-201–220".into() },
        Department { name: "Executive".into(), phone: "x0100".into(), head: "Umar Shaikh".into(), floor: "PH".into(), rooms: "PH-01–05".into() },
        Department { name: "Research".into(), phone: "x8800".into(), head: "Will Thornton".into(), floor: "3".into(), rooms: "H-301–320".into() },
    ]
}

#[tauri::command]
fn get_useful_numbers() -> Vec<UsefulNumber> {
    vec![
        UsefulNumber { name: "Barber".into(), number: "x9901".into(), hours: "Mon–Fri  09:00–17:00".into(), cat: "SERVICES".into(), icon: "✂".into() },
        UsefulNumber { name: "Cafeteria".into(), number: "x9902".into(), hours: "Mon–Fri  07:30–15:30".into(), cat: "FOOD".into(), icon: "⬡".into() },
        UsefulNumber { name: "Coffee Station".into(), number: "x9903".into(), hours: "Mon–Fri  07:00–18:00".into(), cat: "FOOD".into(), icon: "◉".into() },
        UsefulNumber { name: "Medical Unit".into(), number: "x9911".into(), hours: "Mon–Fri  08:00–17:00".into(), cat: "HEALTH".into(), icon: "✚".into() },
        UsefulNumber { name: "Security Desk".into(), number: "x0001".into(), hours: "24/7".into(), cat: "SECURITY".into(), icon: "◈".into() },
        UsefulNumber { name: "Reception".into(), number: "x0000".into(), hours: "Mon–Fri  08:00–20:00".into(), cat: "ADMIN".into(), icon: "⬛".into() },
        UsefulNumber { name: "Parking Control".into(), number: "x9920".into(), hours: "Mon–Sun  07:00–22:00".into(), cat: "SERVICES".into(), icon: "⬟".into() },
        UsefulNumber { name: "Mail Room".into(), number: "x9930".into(), hours: "Mon–Fri  09:00–16:00".into(), cat: "SERVICES".into(), icon: "▤".into() },
        UsefulNumber { name: "Print Room".into(), number: "x9940".into(), hours: "Mon–Fri  08:00–18:00".into(), cat: "SERVICES".into(), icon: "▣".into() },
        UsefulNumber { name: "Conference Desk".into(), number: "x9950".into(), hours: "Mon–Fri  08:00–19:00".into(), cat: "ADMIN".into(), icon: "◫".into() },
        UsefulNumber { name: "Gym".into(), number: "x9960".into(), hours: "Mon–Sat  06:00–21:00".into(), cat: "HEALTH".into(), icon: "◆".into() },
        UsefulNumber { name: "Emergency".into(), number: "x112".into(), hours: "24/7".into(), cat: "EMERGENCY".into(), icon: "⚠".into() },
    ]
}

#[tauri::command]
fn get_all_data() -> AppData {
    AppData {
        personnel: get_personnel(),
        departments: get_departments(),
        useful_numbers: get_useful_numbers(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_personnel,
            get_departments,
            get_useful_numbers,
            get_all_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
