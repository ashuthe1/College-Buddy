// #Ashutosh Gautam </> Codes :)
#pragma GCC optimize("O3,unroll-loops")
#include<bits/stdc++.h>
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
using namespace std;

typedef long long int ll;
typedef tree<ll, null_type, less<ll>, rb_tree_tag, tree_order_statistics_node_update> ordered_set; /* find_by_order(k)  returns iterator to kth element starting from 0;
order_of_key(k) returns count of elements strictly smaller than k; || Make less_equal for multiset */
#define FastandFurious ios_base::sync_with_stdio(0),cin.tie(0),cout.tie(0);
#define int long long int
#define double long double
#define inf (int)1e18+2
#define all(x) (x).begin(),(x).end()
#define gcd __gcd
const int N = 2e5+1;
const int mod = 1e9+7;

// Debugging purpose :))
void show_me(int t){cout << t;}
void show_me(string t){cout << t;}
void show_me(char t){cout << t;}
void show_me(bool t){cout << t;}
void show_me(double t){cout << t;}
void show_me(ordered_set v){cout << "[ "; for (auto i : v){show_me(i); cout << " ";} cout << "]";}
template <class T, class V> void show_me(pair <T, V> p);
template <class T> void show_me(vector <T> v);
template <class T> void show_me(set <T> v);
template <class T> void show_me(multiset <T> v);
template <class T, class V> void show_me(map <T, V> v);
template <class T, class V> void show_me(multimap <T, V> v);
template <class T> void debug(vector<T>adj[], int n);
#define deb(x) cout << #x << " = "; show_me(x); cout << "\n";
#define deb2(x,y) cout << #x << " = ";show_me(x); cout << ", " << #y << " = ";show_me(y);cout << "\n";
#define deb3(x,y,z) cout<<#x<<"=";show_me(x);cout<<", "<<#y<<" = ";show_me(y);cout<<", "<<#z<<" = ";show_me(z);cout<<"\n";

// For laziness ;)
vector<int>g[N],level(N);
vector<bool> is_prime(N+1, true),vis(N,false);
bool powerof2(int x){return x&& (!(x&(x-1)));}
int totalDigits(int n){if(n == 0) return 1;return floor(log10(n))+1;}
long long power(long long a, long long b);
long long powerM(long long a, long long b);
int inv(int n, int p = mod){return powerM(n, p-2);}
void primeseive();
void PrimeFactors(ll n, vector<pair<ll, ll>> &v);
void dfs(int vertex);
void bfs(int source);

/*-----------------------------#Maincode Starts!-----------------------------------*/

void MainCode()
{
    int n;
    cin >> n;

    string ans = "Yes";
    int support = 0;

    for(int i = 0; i < n; i++) 
    {
        string s;
        cin >> s;

        if(s == "For")
        support++;
    }
    if(support < (n+1)/2) ans = "No";

    cout << ans << endl;
    
}

/*-----------------------------#Maincode Ends!-------------------------------------*/
signed main()
{
    FastandFurious
    int TestCaseS = 1;
    // cin >> TestCaseS; 

    // primeseive();
    for(int TestCase = 1; TestCase <= TestCaseS ; TestCase++)
    {
        // cout << "Case #" << TestCase << ": "; // Google!
        MainCode();
    }
    return 0;
}

// Debugging
template <class T, class V> void show_me(pair <T, V> p) {cout << "{"; show_me(p.first); cout << ","; show_me(p.second); cout << "}";}
template <class T> void show_me(vector <T> v) {cout << "[ "; for (T i : v) {show_me(i); cout << " ";} cout << "]";}
template <class T> void show_me(set <T> v) {cout << "[ "; for (T i : v) {show_me(i); cout << " ";} cout << "]";}
template <class T> void show_me(multiset <T> v) {cout << "[ "; for (T i : v) {show_me(i); cout << " ";} cout << "]";}
template <class T, class V> void show_me(map <T, V> v) {cout << "[ "; for (auto i : v) {show_me(i); cout << " ";} cout << "]";}
template <class T, class V> void show_me(multimap <T, V> v) {cout << "[ "; for (auto i : v) {show_me(i); cout << " ";} cout << "]";}
template <class T> void debug(vector<T>adj[], int n){for(int i = 0; i < n; i++){cout<<"adj["<<i<<"]=";show_me(adj[i]);cout << endl;}}
// Functions :
long long power(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
long long powerM(long long a, long long b) {
    a %= mod;
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = (res%mod * a%mod)%mod;
        a = (a%mod * a%mod)%mod;
        b >>= 1;
    }
    return res;
}
void primeseive()
{
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i <= N; i++) {
        if (is_prime[i] && (long long)i * i <= N) {
            for (int j = i * i; j <= N; j += i)
                is_prime[j] = false;
        }
    }
}
void PrimeFactors(ll n, vector<pair<ll, ll>> &v)
{
    for (int i = 2; (i * i) <= n; i++)
    {
        if (n % i != 0)
            continue;
        ll cnt = 0;
        while (n % i == 0)
        {
            n /= i;
            ++cnt;
        }
        v.push_back({i, cnt});
    }
    if (n != 1)
        v.push_back({n, 1});
    sort(v.begin(), v.end());
}
void dfs(int vertex)
{
    /* Take action on vertwx after
     entering the vertex
    */
    vis[vertex] = true;
    
    for(int child : g[vertex])
    {
        /* Take action on child before
        entering the child node */

        if(vis[child]) continue;

        dfs(child);

        /* Take action on child after
        exiting the child node */   
    }
    /* Take action on vertex
    before exiting the vertex */
}
void bfs(int source)
{
    queue < int > q;
    q.push(source);
    vis[source] = 1;

    while (!q.empty())
    {
        int curr_v = q.front();
        q.pop();

        for(int child : g[curr_v]){

            if(!vis[curr_v]){

                q.push(child);
                vis[child] = 1;
                level[child] = level[curr_v]+1;

            }
        }
    } 
}